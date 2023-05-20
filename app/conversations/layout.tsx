import getConversations from "../actions/getConversations";
import Sidebar from "../sharedComponents/Sidebar/Sidebar";
import ListConversations from "./components/ListConversations";

export default async function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listConversations = await getConversations();
  return (
    // @ts-expect-error
    <Sidebar>
      <div className="h-full lg:pl-20">
        <ListConversations listConversations={listConversations} />
        {children}
      </div>
    </Sidebar>
  );
}
