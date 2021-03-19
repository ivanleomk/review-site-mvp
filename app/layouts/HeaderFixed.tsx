import React from "react";

import AuthPopup from "../components/AuthPopup";
import HeaderButton from "../components/HeaderButton";

const HeaderFixed = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="py-5 flex-col text-center px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Unbox</h1>
          <div>
            <HeaderButton />
            <AuthPopup />
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-5">{children}</main>
    </div>
  );
};

export default HeaderFixed;
