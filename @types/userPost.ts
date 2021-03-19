export enum PostFormActions {
  MODIFY_TITLE = "MODIFY_TITLE",
  MODIFY_PRICE = "MODIFY_PRICE",
  MODIFY_DESCRIPTION = "MODIFY_DESCRIPTION",
  MODIFY_TAGS = "MODIFY_TAGS",
  ADD_IMAGE = "ADD_IMAGE",
  MODIFY_LINK = "MODIFY_LINK",
}

export type PostFormAction =
  | PostFormActions.MODIFY_DESCRIPTION
  | PostFormActions.MODIFY_PRICE
  | PostFormActions.MODIFY_TAGS
  | PostFormActions.MODIFY_TITLE
  | PostFormActions.ADD_IMAGE
  | PostFormActions.MODIFY_LINK;

export type PostFormType = {
  title: string;
  price: string;
  description: string;
  photos: File[];
  link: string;
};
