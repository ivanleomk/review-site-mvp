import React, { FC } from "react";

interface NormalButtonProps {
  Text: string;
  onClick: () => void | null;
}

const NormalButton: FC<NormalButtonProps> = ({ onClick, Text }) => {
  return (
    <button
      className="mx-4 inline-flex items-center px-3 py-2  bg-transparent text-sm leading-4 font-medium rounded-md cursor-pointer"
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default NormalButton;
