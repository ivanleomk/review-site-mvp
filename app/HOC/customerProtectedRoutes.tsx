import { Skeleton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { ADMIN } from "../constants/userRoles";
import { useUsers } from "../context/UserContext";

async function redirectToHome(router) {
  await router.push("/");
}

const checkForExistingCredentials = () => {
  return (
    localStorage.getItem("cognito_role") !== null &&
    localStorage.getItem("cognito_email") !== null &&
    localStorage.getItem("cognito_username") !== null
  );
};

const CustomerProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUsers();
  const router = useRouter();

  useEffect(() => {
    //   Not a customer route, do nothing
    if (!router.pathname.includes("customer")) {
      return;
    }
    //Not currently authenticated
    if (!isAuthenticated) {
      redirectToHome(router);
    }
    // No Credentials Exist
    else if (!checkForExistingCredentials) {
      redirectToHome(router);
    }
  }, [router.pathname]);

  // If existing credentials exist and user is not loaded, then we load
  if (checkForExistingCredentials && !user) {
    return <Skeleton />;
  }

  return <>{children}</>;
};

export default CustomerProtectedRoute;
