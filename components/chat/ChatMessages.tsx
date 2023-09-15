"use client";

import { Member } from "@prisma/client";
import ChatWelcome from "./ChatWelcome";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages = ({
  apiUrl,
  chatId,
  member,
  name,
  paramKey,
  paramValue,
  socketQuery,
  socketUrl,
  type,
}: ChatMessagesProps) => {
  return (
    <div className="py4 flex flex-1 flex-col overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};

export default ChatMessages;
