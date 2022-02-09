import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useEffect } from 'react'
import { useFetchBooks } from '../../../hooks/useFetchBooks';
import { formatDate } from '../../../lib/formatDate';
import { FetchedBook } from '../../../types/book';

export const BookManagementRef = () => {

  // メッセージ情報を取得
  const books = useFetchBooks();

  const createColumns = () => {
    // 準備
    const columnsData = {
      id: "id",
      bookId: 'id',
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

    // カスタムテーブルカラム(実際にテーブルにセットする値)
    const columns = [{ field: 'id', headerName: 'ID', hide: true }, ...tempColumns];

    return columns
  }

  const createRows = (books: FetchedBook[]) => {
    const rows = books.map((book, i) => {
      const { id: bookId, title, lastName, firstName, genre, updateDate } = book
      return { id: i, bookId, title, lastName, firstName, genre, updateDate: formatDate(updateDate.toDate()) }
    });
    return rows
  }

  const columns = createColumns()
  const rows = createRows(books);

  return (
    <Box sx={{ minHeight: "300px" }}>
      <DataGrid columns={columns} rows={rows} sx={{ height: "500px" }} />
    </Box>
  )
}
