import React, { FC } from "react";

interface HighlightButtonProps {
  Text: string;
  onClick: () => void | null;
}

const HighlightButton: FC<HighlightButtonProps> = ({ onClick, Text }) => {
  return (
    <button
      className="mx-4 inline-flex items-center px-3 py-2 border text-base border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default HighlightButton;
