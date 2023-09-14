import { Hash, Menu } from "lucide-react";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ name, serverId, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="flex h-12 items-center border-b-2 px-3 font-semibold">
      <Menu />
      {type === "channel" && <Hash className="mr-2 h-5 w-5" />}
      <p className="font-semibold ">{name}</p>
    </div>
  );
};

export default ChatHeader;
