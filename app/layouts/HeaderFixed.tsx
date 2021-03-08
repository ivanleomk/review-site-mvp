import React from "react";
import { useUsers } from "../context/UserContext";
import AuthPopup from "../components/AuthPopup";

const HeaderFixed = ({ children }) => {
  const { user, openAuthModal, isAuthOpen } = useUsers();

  return (
    <div className="flex flex-col h-screen">
      <header className="py-5 flex-col text-center px-4">
        <div className="flex justify-between">
          <h1 className="text-xl">Makan</h1>
          <button onClick={() => openAuthModal()}>Sign In</button>
          <AuthPopup />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-5">{children}</main>
    </div>
  );
};

export default HeaderFixed;
