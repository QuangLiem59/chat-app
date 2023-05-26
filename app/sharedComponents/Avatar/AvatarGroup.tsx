"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[10px]",
    1: "bottom-1 left-[2px]",
    2: "bottom-1 right-[2px]",
  };

  return (
    <div className="relative bg-gray-200 border rounded-full shadow md:h-11 md:w-11 h-9 w-9">
      {slicedUsers.reverse().map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            md:h-[19px]
            md:w-[19px]
            h-[15px]
            w-[15px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            fill
            src={user?.image || "/images/avatar.png"}
            alt="Avatar"
            sizes={"(min-width: 640px) 19px, 15px"}
            className="object-contain"
          />
          {/* <img
            src={user?.image || "/images/avatar.png"}
            alt="Avatar"
            className="object-contain w-full h-full"
          /> */}
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
