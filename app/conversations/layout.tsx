import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../sharedComponents/Sidebar/Sidebar";
import ListConversations from "./components/ListConversations";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listConversations = await getConversations();
  const users = await getUsers();
  return (
    // @ts-expect-error
    <Sidebar>
      <div className="h-full lg:pl-20">
        <ListConversations
          listConversations={listConversations}
          users={users}
        />
        {children}
      </div>
    </Sidebar>
  );
}
