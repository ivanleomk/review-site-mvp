import React, { FC } from "react";
import { userAuthAction, userAuthActions } from "../../@types/userAuth";

type AuthFormHeaderProps = {
  userAction: userAuthAction;
  setUserAction: React.Dispatch<React.SetStateAction<userAuthAction>>;
};

const {
  LOGIN,
  SIGN_UP,
  RESET_PASSWORD,
  SUBMIT_CONFIRMATION_CODE,
} = userAuthActions;

const headerText = {
  LOGIN: {
    title: "Sign in",
    subtitle: "Sign up for a free account today",
    new_action: SIGN_UP,
  },
  SIGN_UP: {
    title: "Sign Up",
    subtitle: "Sign in instead",
    new_action: LOGIN,
  },
  SUBMIT_CONFIRMATION_CODE: {
    title: "Confirm your account",
    subtitle: "Sign in instead",
    new_action: LOGIN,
  },
};
const AuthFormHeaderText: FC<AuthFormHeaderProps> = ({
  userAction,
  setUserAction,
}) => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {headerText[userAction]["title"]}
      </h2>
      <p className="mt-2 text-center  text-gray-600 max-w">
        <span className="mx-1 ">Or</span>
        <span
          onClick={() => setUserAction(headerText[userAction]["new_action"])}
          className="text-indigo-600 text-sm hover:text-indigo-500 cursor-pointer"
        >
          {headerText[userAction]["subtitle"]}
        </span>
      </p>
    </div>
  );
};

export default AuthFormHeaderText;
