import { Box, IconButton, CircularProgress, Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { addBookService } from '../../../../firebase/post';
import { Book } from '../../../../types/book';
import CancelIcon from '@mui/icons-material/Cancel';
import Message from '../../../atoms/Message';
import { useInput } from '../../../../hooks/useInput';
import { useOpenSnackbar } from '../../../../hooks/useSetSnackbarState';
import { SEVERITY } from '../../../../constants/constants';
import { useSetRecoilState } from 'recoil';
import { messageState } from '../../../../globalState/message';
import { isEmptyBookAddInput } from './isEmptyInput';
import { CustomSkeleton } from './CustomSkeleton';

export const BookManagementAdd = () => {
  const [bookId, setIBookId] = useInput();
  const [title, setTitle] = useInput();
  const [firstName, setFirstName] = useInput();
  const [lastName, setLastName] = useInput();
  const [genre, setGenre] = useInput();
  const [load, setLoad] = useState(false);
  const { openBar } = useOpenSnackbar();
  const setMessage = useSetRecoilState(messageState);

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
    setMessage("")
    const book: Book = {
      bookId,
      title,
      firstName,
      lastName,
      genre,
    }
    // TODO:高度なバリデーション処理を実装する
    const result = isEmptyBookAddInput(book);
    if (result) return openBar("空文字は禁止", SEVERITY.INFO);
    setLoad(true);
    try {
      await addBookService(book);
      openBar(`登録完了`, SEVERITY.SUCCESS);
      setLoad(false);
      clear()
    } catch (e) {
      const error = e as Error;
      openBar(error.message, SEVERITY.ERROR);
    }
  }

  // TODO:ボタンの位置をレスポンシブで変える。PCは左寄せ、スマホは右寄せ
  return (
    <div>
      {
        load ? (
          <Box sx={{ m: "3", minHeight: "430px" }}>
            <CustomSkeleton />
          </Box>
        ) : (
          <Box sx={{ minHeight: "430px", display: "flex", flexDirection: "column" }}>
            <Message />
            <Stack spacing={1}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField sx={{ flexBasis: "500px" }} label="ID" placeholder='000' value={bookId} onChange={({ target: { value } }) => setIBookId(value)} autoFocus={true} />
                <IconButton color="error" onClick={() => setIBookId("")} tabIndex={-1}><CancelIcon color="error" /></IconButton >
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
            <Box mt={2} mb={3} >
              <Button sx={{ minWidth: "100px" }} variant="contained" onClick={handleAddBook} disabled={genre === ""}>登録</Button >
            </Box>
          </Box >
        )
      }

    </div >

  )
};
