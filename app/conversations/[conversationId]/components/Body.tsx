"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "../../../libs/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });

    const handleNewMessage = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((currentMessages) => {
        if (find(currentMessages, { id: message.id })) {
          return currentMessages;
        }

        return [...currentMessages, message];
      });

      bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    };

    const handleUpdateMessage = (message: FullMessageType) => {
      setMessages((currentMessages) => {
        return currentMessages.map((currentMessage) => {
          if (currentMessage.id === message.id) {
            return message;
          }

          return currentMessage;
        });
      });
    };

    pusherClient.bind("message:new", handleNewMessage);
    pusherClient.bind("message:update", handleUpdateMessage);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", handleNewMessage);
      pusherClient.unbind("message:update", handleUpdateMessage);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLastMessage={i === messages.length - 1}
          key={message.id}
          data={message}
          preMessage={i > 1 ? messages[i - 1] : null}
        />
      ))}
      <div ref={bottomRef} className="pt-8"></div>
    </div>
  );
};

export default Body;
