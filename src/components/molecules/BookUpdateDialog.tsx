import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useInput } from '../../hooks/useInput'
import { getSeltectedRows } from '../../modules/getSeltectedRows'
import { BookRow, Book, UpdateBook } from '../../types/book'
import CancelIcon from '@mui/icons-material/Cancel';
import { useDialog } from '../../hooks/useDialog'
import { CustomDialog } from './CustomDialog'
import { serverTimestamp } from 'firebase/firestore'


type Props = {
  open: boolean,
  closeDialog: () => void,
  updateBook: (param: UpdateBook) => void,
  rows: BookRow[],
  ids: GridSelectionModel
}

export const BookUpdateDialog: React.FC<Props> = ({ open, closeDialog, updateBook, rows, ids }) => {
  const selectedRow = getSeltectedRows(rows, ids)[0]
  // state
  const [bookId, setIBookId] = useInput(selectedRow.bookId);
  const [title, setTitle] = useInput(selectedRow.title);
  const [authorName, setAuthorName] = useInput(selectedRow.authorName);
  const [genre, setGenre] = useInput(selectedRow.genre);
  // TODO:selectに修正
  const [borrow, setBorrow] = useInput(selectedRow.borrow);
  const [returnDate, setReturnDate] = useInput(selectedRow.returnDate ? selectedRow.returnDate : "");
  const [isOpen, childModal] = useDialog();

  /**
 * 入力をすべてクリア
 */
  const clear = () => {
    setIBookId("")
    setTitle("")
    setAuthorName("")
    setGenre("")
    setBorrow("")
    setReturnDate("")
  }

  const handleClose = () => {
    clear()
    closeDialog()
  }

  const handleUpdateBook = () => {
    childModal.close();
    closeDialog();
    const book: Book = {
      bookId,
      title,
      authorName,
      genre,
      // borrowが可なら貸出可能なためborrowをtrueに更新
      borrow: borrow === "可" ? true : false,
      // returnDateは空文字の場合nullに更新
      returnDate: returnDate === "" ? null : returnDate,
      updateAt: serverTimestamp(),
    }
    const param: UpdateBook = {
      docId: selectedRow.id,
      book,
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
          更新するボタンで更新実行
        </DialogContentText>
        <Box sx={{ minHeight: "350px", minWidth: "300px", mt: "10px" }}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="ID" placeholder='000' value={bookId} onChange={({ target: { value } }) => setIBookId(value)} />
              <IconButton color="error" onClick={() => setIBookId("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="タイトル" placeholder='新世界より' value={title} onChange={({ target: { value } }) => setTitle(value)} />
              <IconButton color="error" onClick={() => setTitle("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="著者" placeholder='貴志祐介' value={authorName} onChange={({ target: { value } }) => setAuthorName(value)} />
              <IconButton color="error" onClick={() => setAuthorName("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="ジャンル" placeholder='SF' value={genre} onChange={({ target: { value } }) => setGenre(value)} />
              <IconButton color="error" onClick={() => setGenre("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="貸出" placeholder='可/不可' value={borrow} onChange={({ target: { value } }) => setBorrow(value)} />
              <IconButton color="error" onClick={() => setBorrow("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField sx={{ flexBasis: "500px" }} label="返却日" placeholder='2022/01/01' value={returnDate} onChange={({ target: { value } }) => setReturnDate(value)} />
              <IconButton color="error" onClick={() => setReturnDate("")} tabIndex={-1} ><CancelIcon color="error" /></IconButton >
            </Box>
          </Stack>
        </Box >
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={3}>
          <Button variant="outlined" color='error' onClick={childModal.open}>更新する</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>編集をやめる</Button>
        </Stack>
        <CustomDialog open={isOpen} closeDialog={childModal.close} positive={handleUpdateBook} display={{ title: "更新確認", text: "更新しますか？" }} />
      </DialogActions>
    </Dialog>
  )
}
