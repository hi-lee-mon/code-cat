import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil';
import { snackbarMessageState } from '../globalState/snackbarState';

export const useSetSnackbarMessage = () => {
  const setMessage = useSetRecoilState(snackbarMessageState);

  const handleSetMessage = useCallback((message: string) => {
    setMessage(message);
  }, [setMessage])

  return { setMessage: handleSetMessage }
}