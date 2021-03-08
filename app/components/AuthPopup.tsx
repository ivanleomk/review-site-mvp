import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useUsers } from "../context/UserContext";

import AuthForm from "./AuthForm";

const AuthPopup = () => {
  const { isAuthOpen, closeAuthModal } = useUsers();

  return (
    <Modal isOpen={isAuthOpen} onClose={closeAuthModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <div className="bg-white py-8 px-4 ">
            <AuthForm />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthPopup;
