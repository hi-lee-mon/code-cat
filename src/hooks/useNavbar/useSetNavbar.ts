import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { navbarState } from "../../globalState/navbarState";

export const useSetNavbar = () => {
  const setOpen = useSetRecoilState(navbarState);
  const closeNavbar = useCallback(() => setOpen(false), [setOpen])
  const openNavbar = useCallback(() => setOpen(true), [setOpen])
  return { closeNavbar, openNavbar } as const
}
