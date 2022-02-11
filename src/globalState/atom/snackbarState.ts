import { atom, useSetRecoilState } from "recoil";

export const snackbarState = atom<boolean>({
  key: "snackbarState",
  default: false,
});

export const snackbarMessageState = atom<string>({
  key: "snackbarMessageState",
  default: "",
});


