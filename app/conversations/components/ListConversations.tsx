"use client";

import useConversation from "@/app/hooks/useConversation";
import ConversationItem from "./ConversationItem";
import { Conversation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FullConversationType } from "@/app/types";

interface ListConversationsProps {
  listConversations: FullConversationType[];
}

const ListConversations: React.FC<ListConversationsProps> = ({
  listConversations,
}) => {
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
    const [items, setItems] = useState(listConversations);

  return (
    <aside className="fixed inset-y-0 left-0 flex flex-col items-center w-full pb-20 overflow-y-auto border-r bg-gray-50 lg:w-80 lg:left-20 lg:pb-0">
      <div className="w-full px-2">
        <div className="flex items-center w-full py-4 border-b">
          <div className="pl-4 text-xl font-semibold text-gray-700">
            Conversations
          </div>
        </div>
        <div className="flex flex-col mt-4">
          {listConversations.map((conversation) => (
            <ConversationItem key={conversation.id} data={conversation} selected={conversationId === conversation.id} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ListConversations;
