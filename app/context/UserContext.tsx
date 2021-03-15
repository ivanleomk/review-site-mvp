import { useDisclosure } from "@chakra-ui/hooks";
import { createContext, useContext, useEffect, useState } from "react";

type UserData = {
  userEmail: string | null;
  jwtToken: string | null;
  userPermissions: string | null;
  userName: string | null;
};

export type UserContextType = {
  user: UserData;
  isAuthenticated: boolean;
  isAuthOpen: boolean;
  openAuthModal: () => void | null;
  closeAuthModal: () => void | null;
  setUser: () => void | null;
  resetUser: () => void | null;
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

  useEffect(() => {
    setIsAuthenticated(user != initialUserArg);
  }, [user]);

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
  };

  return <UserContext.Provider value={sharedState} {...props} />;
};
