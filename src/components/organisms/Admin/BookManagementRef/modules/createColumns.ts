import { GridColDef } from "@mui/x-data-grid";





export const createColumns = () => {
  // カラム名の物理名、論理名オブジェクト
  const columnsData = {
    bookId: 'ID',
    title: 'タイトル',
    authorName: '著者',
    genre: 'ジャンル',
    borrow: '貸出',
    returnDate: '返却日',
    updateAt: '更新日',
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