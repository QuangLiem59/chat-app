"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../sharedComponents/EmptyState";

const Conversation = () => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx(
        "h-full lg:pl-80 hidden lg:block",
        !isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
};

export default Conversation;
