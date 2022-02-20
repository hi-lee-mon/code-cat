import React, { useCallback, useMemo } from 'react'
import { useSetRecoilState } from 'recoil';
import { snackbarAnchorState, snackbarMessageState, snackbarOpenState, snackbarSeverityState } from '../globalState/snackbarState';

type Severity = "success" | "warning" | "error" | "info"

type Anchor = {
  vertical: "top",
  horizontal: "center"
}
type HandleOpen = (message: string, severity: Severity, anchor?: Anchor) => void
// TODO:openとclose処理の統合(呼び出しは、useSnackbar["openSnackbar"]で行う。)
/**
 *
 * @returns openBar snackbarを開く処理
 */
export const useOpenSnackbar = () => {
  // Recoil atom
  const setOpen = useSetRecoilState(snackbarOpenState);
  const setMessage = useSetRecoilState(snackbarMessageState);
  const setAnchor = useSetRecoilState(snackbarAnchorState);
  const setSeverity = useSetRecoilState(snackbarSeverityState);
  // anchor defalut value
  const defaultAnchor: Anchor = useMemo(() => ({ vertical: "top", horizontal: "center" }), [])

  // snackbar open process
  const handleOpen: HandleOpen = useCallback((message, severity, anchor = defaultAnchor) => {
    // snckbar open
    setOpen(true);
    setMessage(message)
    setAnchor(anchor)
    setSeverity(severity)
  }, [setOpen, setMessage, setAnchor, setSeverity, defaultAnchor])

  return { openSnackbar: handleOpen }
}

/**
 *
 * @returns closeBar snackbarを閉じる処理
 */
export const useCloseSnackbar = () => {
  const setOpen = useSetRecoilState(snackbarOpenState);

  const handleClose = useCallback((_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, [setOpen])

  return { closeSnackbar: handleClose }
}