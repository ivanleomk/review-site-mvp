export enum userAuthActions {
  LOGIN = "LOGIN",
  SIGN_UP = "SIGN_UP",
  RESET_PASSWORD = "RESET_PASSWORD",
  SUBMIT_CONFIRMATION_CODE = "SUBMIT_CONFIRMATION_CODE",
}

export type userAuthAction =
  | userAuthActions.LOGIN
  | userAuthActions.RESET_PASSWORD
  | userAuthActions.SIGN_UP
  | userAuthActions.SUBMIT_CONFIRMATION_CODE;

export enum userAuthFormActions {
  UPDATE_EMAIL = "UPDATE_EMAIL",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  UPDATE_USERNAME = "UPDATE_USERNAME",
  UPDATE_CONFIRMATION_CODE = "UPDATE_CONFIRMATION_CODE",
}

export type userAuthFormAction = {
  type: userAuthFormActions;
  payload: { data: string };
};

export type AuthBodyProps = {
  userAction: userAuthAction;
  setUserAction: React.Dispatch<React.SetStateAction<userAuthAction>>;
  postAuthentication: () => void;
  updateUser: () => void;
};

export type FormDataType = {
  username: string;
  password: string;
  email: string;
  confirmation_code: string;
};

export enum UserDetails {
  EMAIL = "email",
  PASSWORD = "password",
  USERNAME = "username",
  CONFIRMATION_CODE = "confirmationCode",
}

export type UserDetail =
  | UserDetails.EMAIL
  | UserDetails.PASSWORD
  | UserDetails.USERNAME
  | UserDetails.CONFIRMATION_CODE;

export enum UserRoles {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export type UserRole = UserRoles.ADMIN | UserRoles.CUSTOMER;
