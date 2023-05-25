"use client";

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users = [] }) => {
  const slicedUsers = users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.reverse().map((user, index) => (
        <div
          key={user.id}
          className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            ${positionMap[index as keyof typeof positionMap]}
          `}
        >
          <Image
            fill
            src={user?.image || "/images/avatar.png"}
            alt="Avatar"
            sizes={"21px, 21px"}
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
