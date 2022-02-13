import { atom } from "recoil";
export const snackbarOpenState = atom({
  key: "snackbarOpenState",
  default: false,
});

export const snackbarAnchorState = atom({
  key: "snackbarAnchorState",
  default: {
    vertical: "top", horizontal: "center"
  } as const
});

export const snackbarMessageState = atom({
  key: "snackbarMessageState",
  default: "",
});

export const snackbarSeverityState = atom<"success" | "warning" | "error" | "info">({
  key: "snackbarSeverityState",
  default: "success",
});
