import { useToast } from "@chakra-ui/toast";
import { Auth } from "aws-amplify";
import { request, gql, GraphQLClient } from "graphql-request";
import { UserRoles } from "../../@types/userAuth";

const { ADMIN, CUSTOMER } = UserRoles;

const produceWarningToast = (toast, title, description) => {
  toast({
    position: "top",
    title,
    description,
    status: "warning",
    duration: 1000,
    isClosable: true,
  });
};

const produceSuccessToast = (toast, title, description) => {
  toast({
    position: "top",
    title,
    description,
    status: "success",
    duration: 1000,
    isClosable: true,
  });
};

const signUp = (email, password, username) => {
  return Auth.signUp({ username, password, attributes: { email } });
};

const sendVerificationCode = (username, confirmationCode) => {
  return Auth.confirmSignUp(username, confirmationCode);
};

const signIn = (username, password) => {
  return Auth.signIn(username, password);
};

const validateEmail = (email) => {
  //Check if User Input is a valid email
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

function checkUniqueEmail(email) {
  const checkEmail = gql`
    query getEmail($email: String!) {
      customer(where: { customer_email: { _eq: $email } }) {
        customer_email
      }
    }
  `;

  const requestHeaders = {
    "content-type": "application/json",
    "x-hasura-admin-secret": "mylongsecretaccesskey",
  };

  const client = new GraphQLClient(
    "https://server.makanreviews.com/v1/graphql"
  );
  return client.request(checkEmail, { email }, requestHeaders);
}

function addCustomerToDatabase(
  customer_username,
  customer_email,
  customer_status
) {
  const UPDATE_CUSTOMER_STATUS = gql`
    mutation(
      $customer_username: String!
      $customer_status: String!
      $customer_email: String!
    ) {
      update_customer(
        where: { customer_username: { _eq: $customer_username } }
        _set: {
          customer_status: $customer_status
          customer_email: $customer_email
        }
      ) {
        affected_rows
      }
    }
  `;

  const requestHeaders = {
    "content-type": "application/json",
    "x-hasura-admin-secret": "mylongsecretaccesskey",
  };

  const client = new GraphQLClient(
    "https://server.makanreviews.com/v1/graphql"
  );
  return client.request(
    UPDATE_CUSTOMER_STATUS,
    { customer_status, customer_username, customer_email },
    requestHeaders
  );
}

function updateCustomerStatus(customer_username, customer_status) {
  const UPDATE_CUSTOMER_STATUS = gql`
    mutation($customer_username: String!, $customer_status: String!) {
      update_customer(
        where: { customer_username: { _eq: $customer_username } }
        _set: { customer_status: $customer_status }
      ) {
        affected_rows
      }
    }
  `;

  const requestHeaders = {
    "content-type": "application/json",
    "x-hasura-admin-secret": "mylongsecretaccesskey",
  };

  const client = new GraphQLClient(
    "https://server.makanreviews.com/v1/graphql"
  );
  return client.request(
    UPDATE_CUSTOMER_STATUS,
    { customer_username, customer_status },
    requestHeaders
  );
}

export const handleSignUp = (formData, toast) => {
  const { email, username, password } = formData;

  if (!validateEmail(email)) {
    return false;
  }

  if (password.length < 8) {
    return false;
  }

  checkUniqueEmail(email)
    .then((res) => {
      if (res.customer.length > 0) {
        throw new Error(
          "An account with this email already exists. Please confirm your account if you haven't"
        );
      }
      signUp(email, password, username)
        .then((res) => {
          console.log(res);
          addCustomerToDatabase(username, email, "UNCONFIRMED");
          produceSuccessToast(
            toast,
            "Succesfully registed!",
            "We've just sent you an confirmation email. Do keep a lookout for it in your inbox"
          );
        })
        .catch((err) => {
          console.log(err);
          if (
            err.message ==
            "User cannot be confirmed. Current status is CONFIRMED"
          ) {
            produceWarningToast(
              "Error encountered!",
              "Email address has already been confirmed"
            );
          } else if ((err.code = "UsernameExistsException")) {
            produceWarningToast(
              "Error encountered",
              "User has already been registered. Either confirm your email or sign in."
            );
          } else {
            produceWarningToast(toast, "Error!", err.message);
          }
        });
    })
    .catch((err) => {
      produceWarningToast(toast, "Error encountered", err.message);
    });
};

// TODO: Convert Auth Library to a promise based function such that we can do redirects on the client side

export const handleConfirmationCode = (formData, toast) => {
  const { username, confirmation_code } = formData;
  sendVerificationCode(username, confirmation_code)
    .then((user) => {
      produceSuccessToast(
        toast,
        "Success!",
        "We've succesfully confirmed your email address. Please Login now."
      );
      updateCustomerStatus(username, "CONFIRMED");
    })
    .catch((err) => {
      if (
        err.message == "User cannot be confirmed. Current status is CONFIRMED"
      ) {
        produceWarningToast(
          toast,
          "Error encountered",
          "Email has already been confirmed. Please login instead"
        );
        return;
      } else {
        produceWarningToast(toast, "Error encountered", err.message);
      }
    });
};

export const handleSignIn = (formData, toast, updateUser, postAuth) => {
  const { username, password } = formData;

  signIn(username, password)
    .then((authUser) => {
      updateCustomerStatus(username, "CONFIRMED");
      const userEmail = authUser.attributes.email;
      const jwtToken = authUser.signInUserSession.idToken.jwtToken;
      const userName = authUser.username;

      const cognitoGroup =
        authUser.signInUserSession.accessToken.payload["cognito:groups"];
      const userPermissions = cognitoGroup ? ADMIN : CUSTOMER;
      const userData = { userEmail, jwtToken, userPermissions, userName };

      localStorage.setItem("cognito_role", userPermissions);
      localStorage.setItem("cognito_email", userEmail);
      localStorage.setItem("cognito_username", userName);

      updateUser(userData);
      console.log("Succesfully authenticated!");

      if (postAuth) {
        postAuth();
      }
    })
    .catch((err) => produceWarningToast(toast, "Warning!", err.message));
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = Auth.signOut({ global: true });

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
