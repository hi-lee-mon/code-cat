import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { deleteBookService } from '../../../../firebase/delete';
import { useFetchBooks } from '../../../../hooks/useFetchBooks';
import { createColumns } from './modules/createColumns';
import { createRows } from './modules/createRows';
import { useSetRecoilState } from 'recoil';
import { messageState } from '../../../../globalState/message';
import { CustomDialog } from '../../../molecules/CustomDialog';
import { useDialog } from '../../../../hooks/useDialog';
import { isString } from '../../../../types/assertion/isString';
import { getSeltectedRows } from '../../../../modules/getSeltectedRows';
import { BookUpdateDialog } from '../../../molecules/BookUpdateDialog';
import { useOpenSnackbar } from '../../../../hooks/useSetSnackbarState';
import { SEVERITY } from '../../../../constants/constants';
import { updateBookParam } from '../../../../types/book';
import { updateBookService } from '../../../../firebase/update';

export const BookManagementRef = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);
  const [isDeleteOpen, deleteDialog] = useDialog()
  const [isUpdateOpen, updateDialog] = useDialog()
  const { openBar } = useOpenSnackbar();
  const setMessage = useSetRecoilState(messageState);

  // 本情報を取得
  const books = useFetchBooks();
  // DataGridのpropsを作成
  const columns = useMemo(() => createColumns(), []);
  const rows = createRows(books);

  // 削除ダイアログオープン
  const handleOpenDeleteDialog = () => {
    const selectedRows = getSeltectedRows(rows, selectedRowIds);
    if (selectedRows.length === 0) return openBar("最低1件選択してください。", SEVERITY.INFO);
    deleteDialog.open()
  }

  /**
   * 削除処理
   * TODO:ある程度本の登録ができたらレコード1つ１つに削除ボタンをつける。
   */
  const deleteBook = () => {
    deleteDialog.close()
    setMessage("")
    selectedRowIds.forEach(async (id) => {
      isString(id)
      // TODO:完成したら削除してよいif文
      if (id === "VYQszrhCDzIB0PrpkKEc") return openBar("ID:000は消せないようにしています。", SEVERITY.INFO);
      try {
        await deleteBookService(id);
      } catch (e) {
        const error = e as Error
        setMessage(error.message)
      }
      setMessage("削除完了")
    });
  }

  // 更新ダイアログオープン
  const handleOpenUpdateDialog = () => {
    const selectedRows = getSeltectedRows(rows, selectedRowIds);
    // TODO:完成したら削除してよいif文
    if (selectedRows.length === 0) return openBar("最低1件選択してください。", SEVERITY.INFO);
    if (selectedRows.length > 1) return openBar("更新は1度に1件までです。", SEVERITY.INFO);
    updateDialog.open()
  }

  /**
   * 更新処理
   * TODO:ある程度本の登録ができたらレコード1つ１つに削除ボタンをつける。
   */
  const updateBook = async (param: updateBookParam) => {
    if (param.id === "VYQszrhCDzIB0PrpkKEc") return openBar("ID:000は更新できないようにしてます", SEVERITY.INFO);
    try {
      await updateBookService(param)
      updateDialog.close()
      openBar("更新完了", SEVERITY.SUCCESS);
    } catch (e) {
      const error = e as Error
      openBar(error.message, SEVERITY.ERROR);
    }
  }



  return (
    <div>
      {/* テーブル */}
      <Box mb={2}>
        <DataGrid
          columns={columns} rows={rows}
          sx={{ minHeight: "380px" }} checkboxSelection
          onSelectionModelChange={(selectionModel) => setSelectedRowIds(selectionModel)}
          selectionModel={selectedRowIds} disableSelectionOnClick
        />
      </Box>
      {/* 削除・更新ボタン */}
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="error" size="large" onClick={handleOpenDeleteDialog}>削除</Button>
        <Button variant="contained" color="primary" size="large" onClick={handleOpenUpdateDialog}>更新</Button>
      </Stack>
      {/* ダイアログ */}
      <CustomDialog open={isDeleteOpen} closeDialog={deleteDialog.close} positive={deleteBook} display={{ title: "削除", text: "削除してもよろしいでしょうか？" }} />
      {
        isUpdateOpen && <BookUpdateDialog open={isUpdateOpen} closeDialog={updateDialog.close} updateBook={updateBook} rows={rows} ids={selectedRowIds} />
      }
    </div>

  )
}
