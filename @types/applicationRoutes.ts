export enum routes {
  HOME_PAGE = "/",
  POST_PAGE = "/customer/post",
  SERVER_PAGE = "https://server.makanreviews.com/v1/graphql",
  IMAGE_LAMBDA_URL = "https://42fm32eia7.execute-api.ap-southeast-1.amazonaws.com/test/upload",
}

export type route_path =
  | routes.HOME_PAGE
  | routes.SERVER_PAGE
  | routes.POST_PAGE
  | routes.IMAGE_LAMBDA_URL;
