import { useRouter } from "next/dist/client/router";
import React from "react";
import { useUsers } from "../context/UserContext";
import HighlightButton from "./Buttons/HighlightButton";
import NormalButton from "./Buttons/NormalButton";
import { routes } from "../../@types/applicationRoutes";
import { signOut } from "../lib/Auth";
import { useToast } from "@chakra-ui/toast";
const { POST_PAGE } = routes;

const HeaderButton = () => {
  const { isAuthenticated, openAuthModal, resetUser } = useUsers();
  const router = useRouter();
  const toast = useToast();

  const handleSignOut = () => {
    signOut()
      .then((res) => {
        resetUser();
        router.push(routes.HOME_PAGE);
        toast({
          title: "Success.",
          description: "You've succesfully signed out.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) =>
        toast({
          title: "Error Encountered.",
          description: err.message,
          status: "warning",
          duration: 2000,
          isClosable: true,
        })
      );
  };

  const handleNewPost = () => {
    router.push(POST_PAGE);
  };

  if (!isAuthenticated) {
    return (
      <>
        <HighlightButton Text="Sign in" onClick={openAuthModal} />
      </>
    );
  }
  return (
    <div className="flex flex-col md:flex-row pr-2">
      <HighlightButton Text="New Post" onClick={handleNewPost} />
      <NormalButton Text="Sign Out" onClick={handleSignOut} />
    </div>
  );
};

export default HeaderButton;
