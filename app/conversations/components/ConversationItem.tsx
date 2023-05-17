"use client";

import { Conversation } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../../hooks/useActiveList";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import Avatar from "../../sharedComponents/Avatar";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import clsx from "clsx";
import AvatarGroup from "@/app/sharedComponents/Avatar/AvatarGroup";

interface UserItemProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationItem: React.FC<UserItemProps> = ({ data, selected }) => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const otherUser = useOtherUser(data);

  const handleClick = useCallback(() => {
    router.push(`conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeenLastMessage = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const listSeen = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return (
      listSeen.filter((user) => {
        user.email === userEmail;
      }).length > 0
    );
  }, [userEmail, lastMessage]);

  const lastMessageContent = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started an conversation!";
  }, [lastMessage]);

  return (
    <div
      className="relative flex items-center w-full px-4 py-2 rounded-lg cursor-pointer gap-x-2 hover:bg-gray-200"
      onClick={handleClick}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="flex flex-col justify-center flex-1 max-w-[80%]">
        <div className="flex items-center justify-between w-full text-sm font-medium text-gray-900 md:text-lg ">
          <div className="w-full max-w-[70%]  overflow-hidden whitespace-nowrap text-ellipsis">
            {data.name || otherUser.name}
          </div>
          <div className="w-full max-w-[30%]  overflow-hidden whitespace-nowrap text-ellipsis flex justify-between items-center">
            {lastMessage?.createdAt && (
              <p className="w-full text-sm font-light text-gray-400">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
        </div>
        <div
          className={clsx(
            "w-full overflow-hidden text-xs italic font-normal md:text-sm text-ellipsis whitespace-nowrap",
            hasSeenLastMessage ? "text-gray-500" : "text-teal-900 font-medium"
          )}
        >
          {lastMessageContent}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
