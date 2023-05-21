"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

// import ImageModal from "./ImageModal";
import Avatar from "@/app/sharedComponents/Avatar/Avatar";

interface MessageBoxProps {
  data: FullMessageType;
  isLastMessage?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLastMessage }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => {
      if (user.email === session.data?.user?.email) {
        return "You";
      } else {
        return user.name;
      }
    })
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-teal-500 text-white" : "bg-gray-100",
    data.image
      ? "rounded-md p-0"
      : "rounded-tl-3xl rounded-br-3xl rounded-tr-2xl rounded-bl-2xl py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1 rounded-">
          {isOwn && (
            <div className="text-xs text-gray-400">
              {format(new Date(data.createdAt), "p")}
            </div>
          )}
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          {!isOwn && (
            <div className="text-xs text-gray-400">
              {format(new Date(data.createdAt), "p")}
            </div>
          )}
        </div>
        <div className={message}>
          {/* <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} /> */}
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="object-cover transition cursor-pointer hover:scale-110 translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLastMessage && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500 ">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
