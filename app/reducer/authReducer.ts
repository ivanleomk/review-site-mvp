import {
  userAuthFormAction,
  userAuthFormActions,
  userAuthActions,
} from "../../@types/userAuth";

export function AuthReducer<FormDataType, userAuthFormAction>(state, action) {
  switch (action.type) {
    case userAuthFormActions.UPDATE_EMAIL: {
      const new_email = action.payload.data;
      return { ...state, email: new_email };
    }
    case userAuthFormActions.UPDATE_PASSWORD: {
      const new_password = action.payload.data;
      return { ...state, password: new_password };
    }
    case userAuthFormActions.UPDATE_USERNAME: {
      const new_username = action.payload.data;
      return { ...state, username: new_username };
    }
    case userAuthFormActions.UPDATE_CONFIRMATION_CODE: {
      const new_confirmation_code = action.payload.data;
      return { ...state, confirmation_code: new_confirmation_code };
    }
    default: {
      return state;
    }
  }
}
