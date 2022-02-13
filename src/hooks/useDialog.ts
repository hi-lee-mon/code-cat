import { useState } from "react";

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const returnValue = [isOpen, { close, open }] as const
  return returnValue
}