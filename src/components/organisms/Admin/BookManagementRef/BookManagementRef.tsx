import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { deleteBook } from '../../../../firebase/delete';
import { useFetchBooks } from '../../../../hooks/useFetchBooks';
import { createColumns } from './modules/createColumns';
import { createRows } from './modules/createRows';
import { useSetRecoilState } from 'recoil';
import { messageState } from '../../../../globalState/atom/message';

export const BookManagementRef = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const setMessage = useSetRecoilState(messageState);
  // メッセージ情報を取得
  const books = useFetchBooks();
  // DataGridのpropsを作成
  const columns = createColumns()
  const rows = createRows(books);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /**
   * 削除処理
   * TODO:ある程度本の登録ができたらレコード1つ１つに削除ボタンをつける。
   */
  const handleDelete = () => {
    handleClose()
    setMessage("")
    selectedRowIds.forEach(async (id) => {
      if (typeof id === "string") {
        try {
          await deleteBook(id);
        } catch (e) {
          const error = e as Error
          setMessage(error.message)
        }
      }
    });
  }

  return (
    <div>
      {/* テーブル */}
      <Box mb={2}>
        <DataGrid columns={columns} rows={rows} sx={{ minHeight: "380px" }} checkboxSelection onSelectionModelChange={(sm) => setSelectedRowIds(sm)} selectionModel={selectedRowIds} />
      </Box>
      {/* 削除・更新ボタン */}
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="error" size="large" onClick={handleOpen}>削除</Button>
        <Button variant="contained" color="primary" size="large" onClick={() => console.log(selectedRowIds)}>更新</Button>
      </Stack>
      {/* ダイアログ */}
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"【削除操作】"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            選択したデータを削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={3}>
            <Button variant="outlined" color='error' onClick={handleDelete}>はい</Button>
            <Button variant="contained" color="primary" onClick={handleClose}>いいえ</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>

  )
}
