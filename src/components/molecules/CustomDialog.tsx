import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'

type Props = {
  open: boolean,
  closeDialog: () => void,
  positive: () => void,
  display: {
    title: string,
    text: string
  }
}

export const CustomDialog: React.FC<Props> = ({ open, closeDialog, positive, display }) => {

  return (
    <Dialog
      open={open}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{ sx: { minWidth: "350px", minHeight: "100px" } }}
    >
      <DialogTitle>【{display.title}】</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {display.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={3}>
          <Button variant="outlined" color='error' onClick={positive}>オッケー！</Button>
          <Button variant="contained" color="primary" onClick={closeDialog}>考え直す</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
