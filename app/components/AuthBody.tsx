import React, { FC, useReducer } from "react";
import {
  UserDetails,
  userAuthFormActions,
  AuthBodyProps,
  FormDataType,
} from "../../@types/userAuth";
import AuthFormInput from "./AuthFormInput";
import { AuthReducer } from "../reducer/authReducer";
import {
  handleConfirmationCode,
  handleSignIn,
  handleSignUp,
} from "../lib/Auth";
import { useToast } from "@chakra-ui/toast";
import AuthFormLink from "./AuthFormLink";

// Import Enums
const { USERNAME, PASSWORD, EMAIL, CONFIRMATION_CODE } = UserDetails;

// Set Constants
const initialFormData: FormDataType = {
  username: "",
  password: "",
  email: "",
  confirmation_code: "",
};

const relevantFields = {
  LOGIN: [USERNAME, PASSWORD],
  SIGN_UP: [EMAIL, USERNAME, PASSWORD],
  SUBMIT_CONFIRMATION_CODE: [USERNAME, CONFIRMATION_CODE],
};

const buttonText = {
  LOGIN: "Sign In",
  SIGN_UP: "Sign Up now",
  SUBMIT_CONFIRMATION_CODE: "Confirm my account",
};

const AuthBody: FC<AuthBodyProps> = ({
  userAction,
  setUserAction,
  postAuthentication,
  updateUser,
}) => {
  const [FormData, dispatch] = useReducer(AuthReducer, initialFormData);

  const updateRelevantValue = (key: userAuthFormActions) => (e) => {
    dispatch({
      type: key,
      payload: { data: e.target.value },
    });
  };
  const toast = useToast();
  const relevantField = relevantFields[userAction];

  const handleSubmitForm = (e) => {
    e.preventDefault();
    switch (userAction) {
      case "SIGN_UP": {
        handleSignUp(FormData, toast);
      }
      case "SUBMIT_CONFIRMATION_CODE": {
        handleConfirmationCode(FormData, toast);
      }
      case "LOGIN": {
        handleSignIn(FormData, toast, updateUser, postAuthentication);
      }
      default:
        return;
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmitForm}>
      <div>
        <AuthFormInput
          htmlFor="username"
          value={FormData.username}
          onChange={updateRelevantValue(userAuthFormActions.UPDATE_USERNAME)}
          type="username"
          field={relevantField}
        />
        <AuthFormInput
          htmlFor="email"
          value={FormData.email}
          onChange={updateRelevantValue(userAuthFormActions.UPDATE_EMAIL)}
          type="email"
          field={relevantField}
        />
        <AuthFormInput
          htmlFor="password"
          value={FormData.password}
          onChange={updateRelevantValue(userAuthFormActions.UPDATE_PASSWORD)}
          type="password"
          field={relevantField}
        />

        <AuthFormInput
          htmlFor="confirmationCode"
          value={FormData.confirmation_code}
          onChange={updateRelevantValue(
            userAuthFormActions.UPDATE_CONFIRMATION_CODE
          )}
          type="confirmationCode"
          field={relevantField}
        />
      </div>
      <AuthFormLink userAction={userAction} setUserAction={setUserAction} />
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {buttonText[userAction]}
        </button>
      </div>
    </form>
  );
};

export default AuthBody;
