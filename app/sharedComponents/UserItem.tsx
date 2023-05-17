"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "./Avatar";

interface UserItemProps {
  data: User;
}

const UserItem: React.FC<UserItemProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`conversations/${data.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, router]);

  return (
    <div
      className="relative flex items-center w-full px-4 py-2 rounded-lg cursor-pointer gap-x-2 hover:bg-gray-200"
      onClick={handleClick}
    >
      <Avatar user={data} />
      <div className="flex flex-col justify-center flex-1 max-w-[80%]">
        <div className="w-full overflow-hidden text-sm font-medium text-gray-900 text-ellipsis whitespace-nowrap md:text-lg ">
          {data.name}
        </div>
        <div className="w-full overflow-hidden text-xs italic font-normal text-gray-700 md:text-sm text-ellipsis whitespace-nowrap">
          {data.email}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
