"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useRoutes from "../hooks/useRoutes";
import LoadingModal from "./modals/LoadingModal";
import Button from "./Buttons";

const EmptyState = () => {
  const router = useRouter();
  const routes = useRoutes();
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const handlePushConversation = () => {
    if (path !== "/conversations") {
      setIsLoading(true);
      router.push("/conversations");
    }
  };

  useEffect(() => {
    isLoading && setIsLoading(false);
  }, [routes]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="flex flex-col items-center justify-center h-full px-4 py-10 bg-gray-100 sm:px-6 lg:px-8">
        <div>
          <Image
            height="256"
            width="256"
            src="/images/emptyChat.png"
            alt="Logo"
            priority={true}
          />
        </div>
        <div className="mt-2 text-xl font-semibold text-gray-700">
          {"It's nice to chat with someone"}
        </div>
        <div className="w-48 mt-2 text-sm font-medium text-gray-500">
          Pick a person from left menu and start your conversation
        </div>
        {path !== "/conversations" && (
          <Button
            secondary
            // className="w-48 mt-2 text-sm font-semibold text-teal-500 underline cursor-pointer"
            onClick={handlePushConversation}
          >
            Go to Conversations List
          </Button>
        )}
      </div>
    </>
  );
};

export default EmptyState;
