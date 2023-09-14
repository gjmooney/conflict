"use client";

import { useEffect, useState } from "react";
import CreateChannelModal from "../modals/CreateChannelModal";
import CreateServerModal from "../modals/CreateServerModal";
import DeleteChannelModal from "../modals/DeleteChannelModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import EditChannelModal from "../modals/EditChannelModal";
import EditServerModal from "../modals/EditServerModal";
import InviteModal from "../modals/InviteModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import MembersModal from "../modals/MembersModal";
import MessageFileModal from "../modals/MessageFileModal";

export const ModalProvider = () => {
  // Stop modals from rendering on server
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateChannelModal />
      <CreateServerModal />
      <DeleteChannelModal />
      <DeleteServerModal />
      <EditChannelModal />
      <EditServerModal />
      <InviteModal />
      <LeaveServerModal />
      <MembersModal />
      <MessageFileModal />
    </>
  );
};
