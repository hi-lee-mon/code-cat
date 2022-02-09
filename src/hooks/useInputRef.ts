import { useRef } from 'react';

type Return = [
  () => string,
  (value: string) => void,
]
export const useInputRef = (): Return => {
  const inputRef = useRef("");

  const setInputRef = (value: string) => {
    inputRef.current = value;
  }

  const getInputRef = () => {
    return inputRef.current
  }



  return [getInputRef, setInputRef];
};
