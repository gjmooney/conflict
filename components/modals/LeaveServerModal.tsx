"use client";

import { useModal } from "@/hooks/useModalStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface LeaveServerModalProps {}

const LeaveServerModal = ({}: LeaveServerModalProps) => {
  const router = useRouter();
  const { isOpen, type, data, onClose } = useModal();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-muted p-0">
        <DialogHeader className="px-6 pt-8 ">
          <DialogTitle className="text-center text-2xl">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-foreground">
              {server?.name}?
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-background/10 px-6 py-4">
          <div className="flex w-full items-center justify-around">
            <Button disabled={isLoading} onClick={onClose} variant={"primary"}>
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onConfirm}
              variant={"destructive"}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
