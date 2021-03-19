import Auth from "@aws-amplify/auth";
import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, useContext, useEffect, useState } from "react";

import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { routes } from "../../@types/applicationRoutes";

type UserData = {
  userEmail: string | null;
  jwtToken: string | null;
  userPermissions: string | null;
  userName: string | null;
};

type header = {
  Authorization: string;
  "x-hasura-user-id": string;
  "x-hasura-role": string;
};

export type UserContextType = {
  user: UserData;
  isAuthenticated: boolean;
  isAuthOpen: boolean;
  openAuthModal: () => void | null;
  closeAuthModal: () => void | null;
  setUser: () => void | null;
  resetUser: () => void | null;
  headers: header | null;
};

const initialUserArg: UserData = {
  userEmail: null,
  jwtToken: null,
  userPermissions: null,
  userName: null,
};

export const UserContext = createContext<UserContextType>({
  user: initialUserArg,
  isAuthenticated: false,
  isAuthOpen: false,
  openAuthModal: null,
  closeAuthModal: null,
  setUser: null,
  resetUser: null,
  headers: null,
});

export const useUsers = () => {
  const innerUserContext = useContext(UserContext);
  if (!innerUserContext) {
    throw new Error(`useUser must be used within a provider`);
  }
  return innerUserContext;
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(initialUserArg);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [client, setClient] = useState(null);
  const [headers, setHeaders] = useState(null);

  console.log(user.jwtToken);

  useEffect(() => {
    setIsAuthenticated(user != initialUserArg);
    if (user) {
      Auth.currentSession().then((res) => {
        console.log("Getting current Auth Session");
        let headers = {};
        let newToken = res.idToken.jwtToken;

        headers["x-hasura-role"] = user.userPermissions;
        headers["Authorization"] = `Bearer ${newToken}`;
        headers["x-hasura-user-id"] = user.userName;

        setHeaders({ ...headers });
      });
    }
  }, [user]);

  useEffect(() => {
    //Check if prior value shave been set
    if (
      localStorage.getItem("cognito_role") !== null &&
      localStorage.getItem("cognito_email") !== null &&
      localStorage.getItem("cognito_username") !== null
    ) {
      refreshUserToken().then((res) => {
        updateUserToken(res.getIdToken().jwtToken);
      });
    }
  }, []);

  console.log(headers);
  const updateUserToken = (newToken) => {
    setUser({
      userEmail: localStorage.getItem("cognito_email"),
      jwtToken: newToken,
      userPermissions: localStorage.getItem("cognito_role"),
      userName: localStorage.getItem("cognito_username"),
    });
  };

  const refreshUserToken = () => {
    return Auth.currentSession();
  };

  const {
    isOpen: isAuthOpen,
    onOpen: openAuthModal,
    onClose: closeAuthModal,
  } = useDisclosure();

  const resetUser = () => {
    setUser(initialUserArg);
    setIsAuthenticated(false);
  };

  const sharedState = {
    user,
    isAuthenticated,
    isAuthOpen,
    openAuthModal,
    closeAuthModal,
    setUser,
    resetUser,
    headers,
  };

  return <UserContext.Provider value={sharedState} {...props} />;
};
