import React, { FC } from "react";
import { userAuthActions } from "../../@types/userAuth";
import { userAuthAction } from "../../@types/userAuth";

const { LOGIN, SIGN_UP } = userAuthActions;

type AuthFormProps = {
  userAction: userAuthActions;
  setUserAction: React.Dispatch<React.SetStateAction<userAuthAction>>;
};

const AuthFormLink: FC<AuthFormProps> = ({ userAction, setUserAction }) => {
  if (userAction == LOGIN) {
    return (
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    );
  }

  if (userAction == SIGN_UP) {
    return (
      <div className="flex items-center justify-between">
        <div
          onClick={() =>
            setUserAction(userAuthActions.SUBMIT_CONFIRMATION_CODE)
          }
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Enter Confirmation Code
        </div>
      </div>
    );
  }

  return null;
};

export default AuthFormLink;
