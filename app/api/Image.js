import axios from "axios";
import { routes } from "../../@types/applicationRoutes";

const { IMAGE_LAMBDA_URL } = routes;

const Image = axios.create({
  baseURL: IMAGE_LAMBDA_URL,
  timeout: 3000,
});

export default Image;
