"use client";

import clsx from "clsx";
import { useState } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  minlength?: number;
  maxlength?: number;
  isDark?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  minlength,
  maxlength,
  isDark,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className={clsx(
          "block text-sm font-semibold leading-6",
          isDark ? "text-gray-100" : "text-gray-900"
        )}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={(type === "password" && isShowPassword && "text") || type}
          autoComplete={id}
          disabled={disabled}
          minLength={minlength}
          maxLength={maxlength}
          {...register(id, { required })}
          className={clsx(
            `form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
          ring-gray-300
          placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
          focus:ring-sky-600
            sm:text-sm
            sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
        {type === "password" &&
          (isShowPassword ? (
            <IoEye
              className="absolute text-teal-900 -translate-y-1/2 cursor-pointer right-2 top-1/2"
              onClick={() => setIsShowPassword(false)}
            />
          ) : (
            <IoEyeOff
              className="absolute text-teal-900 -translate-y-1/2 cursor-pointer right-2 top-1/2"
              onClick={() => setIsShowPassword(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
