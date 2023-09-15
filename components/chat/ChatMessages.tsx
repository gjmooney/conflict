"use client";

import { useChatQuery } from "@/hooks/useChatQuery";
import { Member } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
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
  const queryKey = `chat:${chatId}`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      apiUrl,
      paramKey,
      paramValue,
      queryKey,
    });

  if (status === "loading") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-foreground/60" />
        <p className="text-xs text-foreground/60">Loading Messages...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-4 h-7 w-7 text-foreground/60" />
        <p className="text-xs text-foreground/60">Something went wrong...</p>
      </div>
    );
  }

  return (
    <div className="py4 flex flex-1 flex-col overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
    </div>
  );
};

export default ChatMessages;
