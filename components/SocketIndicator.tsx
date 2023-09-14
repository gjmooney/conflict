"use client";

import { useSocket } from "./providers/SocketProvider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="border-none bg-yellow-600 text-foreground"
      >
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-none bg-emerald-600 text-foreground"
    >
      Live: Real-time updates
    </Badge>
  );
};
