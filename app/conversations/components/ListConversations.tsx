"use client";

import useConversation from "@/app/hooks/useConversation";
import ConversationItem from "./ConversationItem";
import { Conversation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import GroupChatModal from "@/app/sharedComponents/modals/GroupChatModal";
import { useSession } from "next-auth/react";
import { find } from "lodash";
import { pusherClient } from "../../libs/pusher";

interface ListConversationsProps {
  listConversations: FullConversationType[];
  users: User[];
}

const ListConversations: React.FC<ListConversationsProps> = ({
  listConversations,
  users,
}) => {
  const router = useRouter();
  const session = useSession();
  const { isOpen, conversationId } = useConversation();
  const [items, setItems] = useState(listConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!currentEmail) {
      return;
    }

    const handleNewConversation = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const handleUpdateConversation = (conversation: FullConversationType) => {
      setItems((current) => {
        try {
          let updateObjIndex = current.findIndex(
            (elm) => elm.id === conversation.id
          );

          console.log(current[updateObjIndex], conversation);

          if (!updateObjIndex || !current[updateObjIndex]?.messages?.length) {
            return current.map((elm) => {
              if (elm.id === conversation.id) {
                return {
                  ...elm,
                  messages: conversation.messages,
                };
              }

              return elm;
            });
          }

          if (
            current[updateObjIndex]?.messages[
              current[updateObjIndex]?.messages?.length - 1
            ]?.id === conversation?.messages[0]?.id
          ) {
            if (
              current[updateObjIndex]?.messages[
                current[updateObjIndex]?.messages?.length - 1
              ]?.seen.length !== conversation?.messages[0]?.seen.length
            ) {
              return current.map((elm) => {
                if (elm.id === conversation.id) {
                  return {
                    ...elm,
                    messages: conversation.messages,
                  };
                }

                return elm;
              });
            }

            return current;
          }

          let newUpdateObj = {
            ...current[updateObjIndex],
            messages: conversation.messages,
          };
          let newArr = [...current];
          newArr.splice(updateObjIndex, 1);
          newArr.unshift(newUpdateObj);
          return newArr;
        } catch (error) {
          console.log(error);
        }

        return current;
      });
    };

    const handleRemoveConversation = (conversation: FullConversationType) => {
      setItems((current) => {
        return current.filter((elm) => elm.id !== conversation.id);
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.subscribe(currentEmail);
    pusherClient.bind("conversation:new", handleNewConversation);
    pusherClient.bind("conversation:update", handleUpdateConversation);
    pusherClient.bind("conversation:remove", handleRemoveConversation);

    return () => {
      pusherClient.unsubscribe(currentEmail);
      pusherClient.unbind("conversation:new", handleNewConversation);
      pusherClient.unbind("conversation:update", handleUpdateConversation);
      pusherClient.unbind("conversation:remove", handleRemoveConversation);
    };
  }, [currentEmail, conversationId, router]);

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
