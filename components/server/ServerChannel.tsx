"use client";

import { useModal } from "@/hooks/useModalStore";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../ActionTooltip";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const channelIconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModal();

  const Icon = channelIconMap[channel.type];

  return (
    <button
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md p-2 transition last:pb-4 hover:bg-background/60",
        params?.channelId === channel.id && "bg-emerald-700",
      )}
      onClick={() => {}}
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-foreground/60 group-hover:text-foreground" />
      <p
        className={cn(
          "line-clamp-1 text-sm font-semibold text-foreground/60  transition group-hover:text-foreground",
          params?.channelId === channel.id && "text-emerald-700 ",
        )}
      >
        {channel.name}
      </p>
      {channel.name.toLowerCase() !== "general" &&
        role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Edit">
              <Edit className="hidden h-4 w-4 text-foreground/60 group-hover:block group-hover:text-foreground" />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                className="hidden h-4 w-4 text-destructive/60 group-hover:block group-hover:text-destructive"
                onClick={() => onOpen("deleteChannel", { server, channel })}
              />
            </ActionTooltip>
          </div>
        )}
      {channel.name.toLowerCase() === "general" && (
        <Lock className="ml-auto h-4 w-4 text-foreground/60 group-hover:text-foreground" />
      )}
    </button>
  );
};

export default ServerChannel;
