"use client";

import { useChatQuery } from "@/hooks/useChatQuery";
import { useChatSocket } from "@/hooks/useChatSocket";
import { Member, Message, Profile } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "./ChatItem";
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

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWIthProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
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
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      apiUrl,
      paramKey,
      paramValue,
      queryKey,
    });

  useChatSocket({ queryKey, addKey, updateKey });

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
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWIthProfile) => (
              <ChatItem
                key={message.id}
                currentMember={member}
                id={message.id}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                member={message.member}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
