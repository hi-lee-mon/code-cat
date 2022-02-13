import { useState } from "react";

export const useInput = (initial = "") => {
  const [input, setInput] = useState(initial);

  const changeInput = (value: string) => {
    setInput(value)
  }
  const returnValue = [input, changeInput] as const
  return returnValue
}