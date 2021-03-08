import React, { useState } from "react";
import { userAuthAction, userAuthActions } from "../../@types/userAuth";
import AuthFormHeaderText from "./AuthFormHeaderText";
import AuthBody from "./AuthBody";
import { useUsers } from "../context/UserContext";

const AuthForm = () => {
  const [userAction, setUserAction] = useState<userAuthAction>(
    userAuthActions.LOGIN
  );

  const { closeAuthModal, setUser } = useUsers();

  return (
    <>
      <AuthFormHeaderText
        userAction={userAction}
        setUserAction={setUserAction}
      />
      <AuthBody
        userAction={userAction}
        setUserAction={setUserAction}
        postAuthentication={closeAuthModal}
        updateUser={setUser}
      />
    </>
  );
};

export default AuthForm;
