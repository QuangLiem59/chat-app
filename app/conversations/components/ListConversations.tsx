"use client";

import useConversation from "@/app/hooks/useConversation";
import ConversationItem from "./ConversationItem";
import { Conversation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import GroupChatModal from "@/app/sharedComponents/modals/GroupChatModal";

interface ListConversationsProps {
  listConversations: FullConversationType[];
  users: User[];
}

const ListConversations: React.FC<ListConversationsProps> = ({
  listConversations,
  users,
}) => {
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  const [items, setItems] = useState(listConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="w-full px-2">
          <div className="flex items-center justify-between w-full py-4 border-b">
            <div className="pl-4 text-xl font-semibold text-gray-700">
              Conversations
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="p-1 cursor-pointer group"
            >
              <AiOutlineUsergroupAdd
                size={28}
                className="text-gray-500 transition group-hover:text-teal-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            {items.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                data={conversation}
                selected={conversationId === conversation.id}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default ListConversations;
