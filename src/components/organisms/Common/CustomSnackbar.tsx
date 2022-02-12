import { Alert, Snackbar } from '@mui/material'
import { useCloseSnackbar } from '../../../hooks/useSetSnackbarState';
import { useRecoilValue } from 'recoil';
import { snackbarAnchorState, snackbarMessageState, snackbarOpenState, snackbarSeverityState } from '../../../globalState/snackbarState';

export const CustomSnackbar = () => {
  const { closeBar } = useCloseSnackbar();
  const open = useRecoilValue(snackbarOpenState);
  const anchor = useRecoilValue(snackbarAnchorState);
  const severity = useRecoilValue(snackbarSeverityState);
  const message = useRecoilValue(snackbarMessageState);
  return (
    <Snackbar anchorOrigin={anchor} open={open} autoHideDuration={3000} onClose={closeBar}>
      <Alert onClose={closeBar} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
