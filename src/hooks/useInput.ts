import { useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState("");

  const changeInput = (value: string) => {
    setInput(value)
  }
  const returnValue = [input, changeInput] as const
  return returnValue
}