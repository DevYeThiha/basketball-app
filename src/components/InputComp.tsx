"use client";

import clsx from "clsx";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface InputCompProps {
  label: string;
  name: string;
  hookFormProps: any;
  wrapperClass?: string;
  error?: string;
  isPassword?: boolean;
}

const InputComp: React.FC<InputCompProps> = ({
  label,
  name,
  error,
  wrapperClass = "",
  hookFormProps,
  isPassword = false,
}) => {
  const [showText, setShowText] = useState<boolean>(false);
  return (
    <div className={clsx("mt-5 w-full", wrapperClass)}>
      <div className="flex w-full justify-between mb-1">
        <label className="text-xs font-bold" htmlFor={name}>
          {label}
        </label>
        {error && <span className="text-xs text-red-800">{error}</span>}
      </div>
      <div className="relative w-full h-max items-center">
        <input
          className="flex h-[2.5rem] items-center bg-zinc-100 shadow outline-none px-3 w-full"
          id={name}
          {...hookFormProps}
          type={isPassword ? (showText ? "text" : "password") : "text"}
        />
        {isPassword && (
          <div className="absolute top-[0.7rem] right-[1rem] h-max cursor-pointer" onClick={() => setShowText(pre => !pre)}>
            {
              showText ? <AiFillEye /> : <AiFillEyeInvisible />
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComp;
