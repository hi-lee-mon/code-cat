import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { useFetchBooks } from '../../../hooks/useFetchBooks';
import { formatDate } from '../../../lib/formatDate';
import { FetchedBook } from '../../../types/book';

// TODO:molecules化と関数の外部化？
export const BookManagementRef = () => {
  const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>([]);

  // メッセージ情報を取得
  const books = useFetchBooks();

  const createColumns = () => {
    // 準備
    const columnsData = {
      bookId: 'ID',
      title: 'タイトル',
      lastName: '姓',
      firstName: '名',
      genre: 'ジャンル',
      updateDate: '更新日',
    };
    // テンプレートテーブルカラム作成
    const tempColumns: GridColDef[] = Object.entries(columnsData).map(
      ([key, value]) => ({
        field: key,
        headerName: value,
        width: 200,
      })
    );

    // TODO:ボタンを更新、削除ボタンを埋め込む
    const editColumns = {

    }

    // カスタムテーブルカラム(実際にテーブルにセットする値)
    const columns = [{ field: 'id', headerName: 'ID', hide: true }, ...tempColumns];

    return columns
  }

  const createRows = (books: FetchedBook[]) => {
    const rows = books.map((book) => {
      const { id, bookId, title, lastName, firstName, genre, updateDate } = book
      return { id, bookId, title, lastName, firstName, genre, updateDate: formatDate(updateDate.toDate()) }
    });
    return rows
  }

  const columns = createColumns()
  const rows = createRows(books);
  console.log("columns", columns)
  console.log("row", rows)

  return (
    <Box>
      <Box>
        <DataGrid columns={columns} rows={rows} sx={{ minHeight: "380px" }} checkboxSelection onSelectionModelChange={(sm) => setSelectedRowIds(sm)} selectionModel={selectedRowIds} />
      </Box>
      <Box>
        <Button variant="contained" color="error" onClick={() => console.log(selectedRowIds)}>削除</Button>
        <Button variant="contained" color="primary" onClick={() => console.log(selectedRowIds)}>更新</Button>
      </Box>
    </Box>
  )
}
