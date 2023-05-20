import { usePathname } from "next/navigation";
import useConversation from "./useConversation";
import { useMemo } from "react";
import {GoOrganization, GoSignOut } from "react-icons/go";
import { } from "react-icons/vsc";
import { HiArrowLeftOnRectangle, HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChatBubbleBottomCenterText,
        isActive: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: GoOrganization,
        isActive: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: GoSignOut,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
