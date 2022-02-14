import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useInput } from '../../hooks/useInput'
import { getSeltectedRows } from '../../modules/getSeltectedRows'
import { FetchedBook, updateBookParam } from '../../types/book'
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react'


type Props = {
  open: boolean,
  closeDialog: () => void,
  updateBook: (param: updateBookParam) => void,
  rows: FetchedBook[],
  ids: GridSelectionModel
}

export const BookUpdateDialog: React.FC<Props> = ({ open, closeDialog, updateBook, rows, ids }) => {
  // state
  const selectedRow = getSeltectedRows(rows, ids)[0]
  const [bookId, setIBookId] = useInput(selectedRow.bookId);
  const [title, setTitle] = useInput(selectedRow.title);
  const [firstName, setFirstName] = useInput(selectedRow.firstName);
  const [lastName, setLastName] = useInput(selectedRow.lastName);
  const [genre, setGenre] = useInput(selectedRow.genre);

  /**
 * 入力をすべてクリア
 */
  const clear = () => {
    setIBookId("")
    setTitle("")
    setFirstName("")
    setLastName("")
    setGenre("")
  }

  const handleClose = () => {
    clear()
    closeDialog()
  }

  const handleUpdateBook = () => {
    const param: updateBookParam = {
      id: selectedRow.id,
      book: {
        bookId,
        title,
        firstName,
        lastName,
        genre,
      }
    }
    updateBook(param);
  }


  return (
    <Dialog
      open={open}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{ sx: { minWidth: "350px", minHeight: "100px" } }}
    >
      <DialogTitle>【更新】</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          更新したい項目を編集して更新するボタンを押下してください。
        </DialogContentText>
        <Box sx={{ minHeight: "430px", mt: "10px" }}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="ID" placeholder='000' value={bookId} onChange={({ target: { value } }) => setIBookId(value)} />
              <IconButton color="error" onClick={() => setIBookId("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="タイトル" placeholder='新世界より' value={title} onChange={({ target: { value } }) => setTitle(value)} />
              <IconButton color="error" onClick={() => setTitle("")} tabIndex={-1}><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="著者名(姓)" placeholder='貴志' value={lastName} onChange={({ target: { value } }) => setLastName(value)} />
              <IconButton color="error" onClick={() => setLastName("")} tabIndex={-1}><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="著者名(名)" placeholder='祐介' value={firstName} onChange={({ target: { value } }) => setFirstName(value)} />
              <IconButton color="error" onClick={() => setFirstName("")} tabIndex={-1}><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="ジャンル" placeholder='SF' value={genre} onChange={({ target: { value } }) => setGenre(value)} />
              <IconButton color="error" onClick={() => setGenre("")} tabIndex={-1}><CancelIcon color="error" /></IconButton >
            </Box>
          </Stack>
        </Box >
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={3}>
          <Button variant="outlined" color='error' onClick={handleUpdateBook}>更新する</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>編集をやめる</Button>
        </Stack>
      </DialogActions>
    </Dialog>
  )
}
