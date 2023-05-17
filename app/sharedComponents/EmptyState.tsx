import Image from "next/image";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-10 bg-gray-100 sm:px-6 lg:px-8">
      <div>
        <Image
          height="256"
          width="256"
          src="/images/emptyChat.png"
          alt="Logo"
        />
      </div>
      <div className="mt-2 text-xl font-semibold text-gray-700">
        It's nice to chat with someone
      </div>
      <div className="w-48 mt-2 text-sm font-medium text-gray-500">
        Pick a person from left menu and start your conversation
      </div>
    </div>
  );
};

export default EmptyState;
