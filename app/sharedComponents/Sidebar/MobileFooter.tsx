"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useEffect, useState } from "react";
import DesktopItem from "./DesktopItem";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "./MobileItem";
import LoadingModal from "../modals/LoadingModal";
import SettingsModal from "./SettingsModal";
import { User } from "@prisma/client";
import Avatar from "../Avatar/Avatar";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);

  const handleItemClick = (onClick: any) => {
    setIsLoading(true);
    if (onClick) {
      return onClick();
    }
  };

  useEffect(() => {
    isLoading && setIsLoading(false);
  }, [routes]);

  if (isOpen) {
    return null;
  }

  return (
    <>
      {isLoading && <LoadingModal />}
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpenSettingModal}
        onClose={() => setIsOpenSettingModal(false)}
      />
      <div className="fixed flex justify-between w-full bottom-0 z-40 items-center bg-white border-t-[1px] lg:hidden ">
        <nav className="flex items-center justify-between flex-1 w-full py-2">
          <ul
            role="list"
            className="flex items-center justify-around w-full space-y-1 "
          >
            <li
              onClick={() => setIsOpenSettingModal(true)}
              className="transition cursor-pointer hover:opacity-75"
            >
              <Avatar user={currentUser} />
            </li>
            {routes.map((item) => (
              <MobileItem
                key={item.label}
                label={item.label}
                href={item.href}
                icon={item.icon}
                isActive={item.isActive}
                onClick={() => handleItemClick(item.onClick)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileFooter;
