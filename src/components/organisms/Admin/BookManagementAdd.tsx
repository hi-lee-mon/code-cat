import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { addBook } from '../../../firebase/post';
import { Book } from '../../../types/book';
import CancelIcon from '@mui/icons-material/Cancel';

const isValid = (book: Book) => {
  if (book.id === "") return "空文字禁止"
  if (book.title === "") return "空文字禁止"
  if (book.firstName === "") return "空文字禁止"
  if (book.lastName === "") return "空文字禁止"
  if (book.genre === "") return "空文字禁止"
  return "";
}

export const BookManagementAdd = () => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const handleAddBook = async () => {
    const book: Book = {
      id,
      title,
      firstName,
      lastName,
      genre,
    }
    isValid(book);
    setLoad(true);



    const result = await addBook(book);
    setLoad(false);

    if (!result) return setMessage("登録失敗")
    setMessage("登録成功")
    setId("")
    setTitle("")
    setFirstName("")
    setLastName("")
    setGenre("")
  }
  return (
    <div>
      {
        load ? (
          <Box sx={{ m: "3" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <p style={{ color: "red" }}>{message}</p>
            <Stack spacing={1}>
              <Box sx={{ display: "flex" }}>
                <TextField label="ID" placeholder='000' value={id} onChange={({ target: { value } }) => setId(value)} />
                <Button color="error" onClick={() => setId("")}><CancelIcon color="error" /></Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <TextField label="タイトル" value={title} onChange={({ target: { value } }) => setTitle(value)} />
                <Button color="error" onClick={() => setTitle("")}><CancelIcon color="error" /></Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <TextField label="作者(姓)" value={lastName} onChange={({ target: { value } }) => setLastName(value)} />
                <Button color="error" onClick={() => setLastName("")}><CancelIcon color="error" /></Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <TextField label="作者(名)" value={firstName} onChange={({ target: { value } }) => setFirstName(value)} />
                <Button color="error" onClick={() => setFirstName("")}><CancelIcon color="error" /></Button>
              </Box>
              <Box sx={{ display: "flex" }}>
                <TextField label="ジャンル" value={genre} onChange={({ target: { value } }) => setGenre(value)} />
                <Button color="error" onClick={() => setGenre("")}><CancelIcon color="error" /></Button>
              </Box>
            </Stack>
            <p>
              <Button sx={{ minWidth: "100px" }} variant="contained" onClick={handleAddBook} disabled={genre === ""}>追加</Button>
            </p>
          </Box>
        )
      }

    </div>

  )
};
