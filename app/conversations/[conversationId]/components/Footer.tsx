"use client";

import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IoImages, IoSend } from "react-icons/io5";
import MessageInput from "./MessageInput";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";

const Footer = () => {
  const { conversationId } = useConversation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const handleInputSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/chats", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleImageUpload = (data: any) => {
    axios.post("/api/chats", {
      image: data?.info?.secure_url,
      conversationId: conversationId,
    });
  };
  return (
    <div className="flex items-center w-full gap-2 p-4 bg-white border-t lg:gap-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleImageUpload}
        uploadPreset="p8xnjxd9"
      >
        <IoImages
          size={36}
          className="text-teal-500 transition cursor-pointer hover:text-teal-600"
        />
      </CldUploadButton>

      <form
        className="flex items-center w-full gap-2 lg:gap-4"
        onSubmit={handleSubmit(handleInputSubmit)}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write something..."
        />
        <button type="submit" className="cursor-pointer group">
          <IoSend
            size={24}
            className="text-teal-500 transition group-hover:text-teal-600"
          />
        </button>
      </form>
    </div>
  );
};

export default Footer;
