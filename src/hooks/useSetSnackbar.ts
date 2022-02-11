import React, { useCallback } from 'react'
import { useSetRecoilState } from 'recoil';
import { snackbarState } from '../globalState/atom/snackbarState';

export const useOpenSnackbar = () => {
  const setOpen = useSetRecoilState(snackbarState);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen])

  return { openBar: handleOpen }
}

export const useCloseSnackbar = () => {
  const setOpen = useSetRecoilState(snackbarState);

  const handleClose = useCallback((_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, [setOpen])

  return { closeBar: handleClose, }
}


