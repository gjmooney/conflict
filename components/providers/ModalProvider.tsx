"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "../modals/CreateServerModal";

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
      <CreateServerModal />
    </>
  );
};
