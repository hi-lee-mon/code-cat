import { atom, selector } from "recoil";

export const snackbarState = atom({
  key: "snackbarState",
  default: false,
});

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

export const snackbarSeverityState = atom<"success" | "warning">({
  key: "snackbarSeverityState",
  default: "success",
});
