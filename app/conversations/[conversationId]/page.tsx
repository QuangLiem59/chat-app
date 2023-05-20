import getConversation from "@/app/actions/getConversation";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/sharedComponents/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

interface ConversationProps {
  conversationId: string;
}

const Conversation = async ({ params }: { params: ConversationProps }) => {
  const conversation = await getConversation(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex flex-col h-full">
          <EmptyState />
        </div>
      </div>
    )
  }

  return <div className="h-full lg:pl-80">
  <div className="flex flex-col h-full">
    <Header conversation={conversation} />
    <Body initialMessages={messages!} />
    <Footer />
  </div>
</div>;
};

export default Conversation;
