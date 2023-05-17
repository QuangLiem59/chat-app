"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-between w-full bottom-0 z-40 items-center bg-white border-t-[1px] lg:hidden ">
      <nav className="flex items-center justify-between w-full py-2">
        <ul role="list" className="flex items-center justify-around w-full space-y-1 ">
          {routes.map((item) => (
            <MobileItem
              key={item.label}
              href={item.href}
              icon={item.icon}
              isActive={item.isActive}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileFooter;
