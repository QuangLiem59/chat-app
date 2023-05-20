"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  required,
  placeholder,
  type,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="w-full px-4 py-2 font-semibold text-teal-900 border-b focus:outline-none bg-gradient-to-r from-teal-500 to-emerald-500 bgSize-b bg-[0%_100%] bg-h bg-no-repeat transition-[background-size] ease-in-out duration-300"
      />
    </div>
  );
};

export default MessageInput;
