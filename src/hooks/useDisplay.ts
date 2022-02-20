import { useState } from "react";

export const useDisplay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const returnValue = [isOpen, { close, open }] as const
  return returnValue
}