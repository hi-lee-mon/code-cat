import { atomFamily } from "recoil";

export const inputTextState = atomFamily<string, string>({
  key: "inputTextState",
  default: ""
});