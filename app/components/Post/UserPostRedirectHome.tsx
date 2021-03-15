import { useRouter } from "next/dist/client/router";
import React from "react";
import { routes } from "../../../@types/applicationRoutes";

const UserPostRedirectHome = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(routes.HOME_PAGE);
  };
  return (
    <div className="flex cursor-pointer" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
      <p className="pl-2">Go Back</p>
    </div>
  );
};

export default UserPostRedirectHome;
