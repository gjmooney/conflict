import { Hash } from "lucide-react";
import MobileToggle from "../MobileToggle";
import { SocketIndicator } from "../SocketIndicator";
import UserAvatar from "../UserAvatar";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="flex h-12 items-center border-b-2 px-3 font-semibold">
      <MobileToggle serverId={serverId} />
      {type === "channel" && <Hash className="mr-2 h-5 w-5" />}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="mr-2 h-4 w-4" />
      )}
      <p className="font-semibold ">{name}</p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
