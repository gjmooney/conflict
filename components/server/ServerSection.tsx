"use client";

import { useModal } from "@/hooks/useModalStore";
import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import ActionTooltip from "../ActionTooltip";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  sectionType,
  channelType,
  role,
  server,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase">{label}</p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="hover:text-emerald-500"
            onClick={() =>
              onOpen("createChannel", { defaultChannelType: channelType })
            }
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            className="hover:text-emerald-500"
            onClick={() => onOpen("members", { server })}
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
