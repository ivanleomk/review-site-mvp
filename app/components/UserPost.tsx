import React from "react";
import UserPostForm from "./Post/UserPostForm";
import UserPostRedirectHome from "./Post/UserPostRedirectHome";

const UserPost = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl">
        <UserPostRedirectHome />

        <div className="max-w-lg">
          <UserPostForm />
        </div>
      </div>
    </div>
  );
};

export default UserPost;
