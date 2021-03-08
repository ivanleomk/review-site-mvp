import React, { FC } from "react";
import { UserDetail } from "../../@types/userAuth";

type AuthFormProps = {
  htmlFor: string;
  value: string;
  type: string;
  onChange: (any) => void;
  field: UserDetail[];
};

const AuthFormInput: FC<AuthFormProps> = ({
  htmlFor,
  onChange,
  value,
  type,
  field,
}) => {
  let i = 0;
  for (i; i < field.length; i++) {
    if (field[i] == type) {
      break;
    }
  }

  if (i == field.length) {
    return null;
  }

  return (
    <div className="my-6">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {htmlFor.charAt(0).toUpperCase() + htmlFor.slice(1)}
      </label>
      <div className="mt-1">
        <input
          onChange={(e) => onChange(e)}
          id={htmlFor}
          name={htmlFor}
          type={type}
          autoComplete={htmlFor}
          required
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={value}
        />
      </div>
    </div>
  );
};

export default AuthFormInput;
