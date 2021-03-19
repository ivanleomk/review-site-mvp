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
        photos: [photo],
      };
    }
    case PostFormActions.MODIFY_LINK: {
      const { link } = action.payload;
      return {
        ...state,
        link,
      };
    }
    default: {
      return state;
    }
  }
}
