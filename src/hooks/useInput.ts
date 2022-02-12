import { useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState("");

  const changeInput = (value: string) => {
    setInput(value)
  }
  return { input, changeInput }
}
