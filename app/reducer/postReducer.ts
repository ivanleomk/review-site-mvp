import { PostFormType, PostFormActions } from "./../../@types/userPost";

export function PostReducer<PostFormType, PostFormActions>(state, action) {
  switch (action.type) {
    case PostFormActions.MODIFY_TITLE: {
      const { title } = action.payload;
      return { ...state, title };
    }
    case PostFormActions.MODIFY_DESCRIPTION: {
      const { description } = action.payload;
      return { ...state, description };
    }
    case PostFormActions.MODIFY_PRICE: {
      const { price } = action.payload;
      return { ...state, price };
    }

    case PostFormActions.ADD_IMAGE: {
      const { photo } = action.payload;
      return {
        ...state,
        photos: state.photos.concat(photo),
      };
    }
    //   case userAuthFormActions.UPDATE_EMAIL: {
    //     const new_email = action.payload.data;
    //     return { ...state, email: new_email };
    //   }
    //   case userAuthFormActions.UPDATE_PASSWORD: {
    //     const new_password = action.payload.data;
    //     return { ...state, password: new_password };
    //   }
    //   case userAuthFormActions.UPDATE_USERNAME: {
    //     const new_username = action.payload.data;
    //     return { ...state, username: new_username };
    //   }
    //   case userAuthFormActions.UPDATE_CONFIRMATION_CODE: {
    //     const new_confirmation_code = action.payload.data;
    //     return { ...state, confirmation_code: new_confirmation_code };
    //   }
    default: {
      return state;
    }
  }
}
