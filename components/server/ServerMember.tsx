"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="ml-2 h-4 w-4" />,
  [MemberRole.ADMIN]: <ShieldAlert className="ml-2 h-4 w-4 text-destructive" />,
};

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  return (
    <button
      className={cn(
        "group mb-1 flex w-full items-center gap-x-2 rounded-md p-2 transition last:pb-4 hover:bg-background/60",
        params?.memberId === member.id && "bg-emerald-700",
      )}
      onClick={() => {}}
    >
      <UserAvatar src={member.profile.imageUrl} className="h-8 w-8" />
      <p
        className={cn(
          "line-clamp-1 text-sm font-semibold text-foreground/60  transition group-hover:text-foreground",
          params?.memberId === member.id && "text-emerald-700 ",
        )}
      >
        {member.profile.name}
      </p>
    </button>
  );
};

export default ServerMember;
