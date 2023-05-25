"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../../hooks/useActiveList";
import clsx from "clsx";

interface AvatarSize {
  twHeight: string;
  twWidth: string;
  twMdHeight: string;
  twMdWidth: string;
  width: string;
  height?: string;
  mdWidth: string;
  mdHeight?: string;
}
interface AvatarProps {
  user: User;
  size?: AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({ user, size }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative flex items-center justify-center h-9 w-9 md:h-11 md:w-11">
      <div
        className={clsx(
          "relative inline-block overflow-hidden rounded-full",
          !!size
            ? `h-${size.twHeight} w-${size.twWidth} md:h-${size.twMdHeight} md:w-${size.twMdWidth}`
            : "h-9 w-9 md:h-11 md:w-11"
        )}
      >
        <Image
          fill
          src={user?.image || "/images/avatar.png"}
          alt="Avatar"
          sizes={
            !!size
              ? `(min-width: 768px) ${size.mdWidth} ,${size.width}`
              : "(min-width: 768px) 2.75rem ,2.25rem"
          }
          className="object-contain h-9 md:h-11"
        />
        {/* <img
          src={user?.image || "/images/avatar.png"}
          alt="Avatar"
          className="object-contain w-full h-full"
        /> */}
      </div>
      {isActive ? (
        <span className="absolute bottom-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-white md:h-3 md:w-3" />
      ) : null}
    </div>
  );
};

export default Avatar;
