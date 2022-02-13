import { Box, IconButton, CircularProgress, Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { addBookService } from '../../../../firebase/post';
import { Book } from '../../../../types/book';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSetRecoilState } from 'recoil';
import { messageState } from '../../../../globalState/message';
import Message from '../../../atoms/Message';
import { useInput } from '../../../../hooks/useInput';

const isValid = (book: Book) => {
  if (book.bookId === "") return "空文字禁止"
  if (book.title === "") return "空文字禁止"
  if (book.firstName === "") return "空文字禁止"
  if (book.lastName === "") return "空文字禁止"
  if (book.genre === "") return "空文字禁止"
  return "";
}



export const BookManagementAdd = () => {
  const [bookId, setIBookId] = useInput();
  const [title, setTitle] = useInput();
  const [firstName, setFirstName] = useInput();
  const [lastName, setLastName] = useInput();
  const [genre, setGenre] = useInput();
  const setMessage = useSetRecoilState(messageState);
  const [load, setLoad] = useState(false);

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

  /**
   * 本をFirstoreに追加する
   * @returns void
   */
  const handleAddBook = async () => {
    const book: Book = {
      bookId,
      title,
      firstName,
      lastName,
      genre,
    }
    isValid(book);
    setLoad(true);
    const result = await addBookService(book);
    setLoad(false);
    if (!result) return setMessage("DB通信エラー")
    setMessage("登録成功")
    clear()
  }

  return (
    <div>
      {
        load ? (
          <Box sx={{ m: "3", minHeight: "430px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ minHeight: "430px" }}>
            <Message />
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
            <p>
              <Button sx={{ minWidth: "100px" }} variant="contained" onClick={handleAddBook} disabled={genre === ""}>登録</Button >
            </p>
          </Box >
        )
      }

    </div >

  )
};
