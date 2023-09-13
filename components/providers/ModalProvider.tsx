"use client";

import { useEffect, useState } from "react";
import CreateChannelModal from "../modals/CreateChannelModal";
import CreateServerModal from "../modals/CreateServerModal";
import DeleteServerModal from "../modals/DeleteServerModal";
import EditServerModal from "../modals/EditServerModal";
import InviteModal from "../modals/InviteModal";
import LeaveServerModal from "../modals/LeaveServerModal";
import MembersModal from "../modals/MembersModal";

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
      <DeleteServerModal />
      <EditServerModal />
      <InviteModal />
      <LeaveServerModal />
      <MembersModal />
    </>
  );
};
