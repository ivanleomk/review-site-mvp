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
  const {
    isOpen: isAuthOpen,
    onOpen: openAuthModal,
    onClose: closeAuthModal,
  } = useDisclosure();

  const sharedState = {
    user,
    isAuthenticated: false,
    isAuthOpen,
    openAuthModal,
    closeAuthModal,
    setUser,
  };

  return <UserContext.Provider value={sharedState} {...props} />;
};
