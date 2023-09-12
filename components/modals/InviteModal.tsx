"use client";

import { useModal } from "@/hooks/useModalStore";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InviteModalProps {}

const InviteModal = ({}: InviteModalProps) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-muted p-0">
        <DialogHeader className="px-6 pt-8 ">
          <DialogTitle className="text-center text-2xl">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase">
            Server Invite Link
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className="border-0 focus-visible:ring-offset-0"
              value="invite link"
            />
            <Button variant={"primary"} size={"icon"}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button variant={"link"} size={"sm"} className="mt-4 text-xs">
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
