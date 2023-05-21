"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../../hooks/useActiveList";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "../../sharedComponents/Avatar/Avatar";

interface UserItemProps {
  data: User;
}

const UserItem: React.FC<UserItemProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const avatarSize = {
    twHeight: "9",
    twWidth: "9",
    twMdHeight: "11",
    twMdWidth: "11",
    width: "1.75rem",
    mdWidth: "2.25rem",
    height: "1.75rem",
    mdHeight: "2.25rem",
  };

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
      className="relative flex items-center w-full px-4 py-1 rounded-lg cursor-pointer gap-x-2 hover:bg-gray-200"
      onClick={handleClick}
    >
      <Avatar user={data} size={avatarSize} />
      <div className="flex flex-col justify-center flex-1 max-w-[80%]">
        <div className="w-full text-sm font-bold text-gray-900 truncate md:text-base ">
          {data.name}
        </div>
        <div className="w-full text-xs italic font-normal text-gray-700 truncate md:text-sm">
          {data.email}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
