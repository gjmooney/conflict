"use client";

import { useModal } from "@/hooks/useModalStore";
import axios from "axios";
import queryString from "query-string";
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

interface DeleteMessageModalProps {}

const DeleteMessageModal = ({}: DeleteMessageModalProps) => {
  const { isOpen, type, data, onClose } = useModal();

  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      const url = queryString.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);
      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to do this? <br />
            The message will be permanently deleted.
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

export default DeleteMessageModal;
