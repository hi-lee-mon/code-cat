import { formatDate } from "../../../../../modules/formatDate";
import { FetchedBook, BookRow } from "../../../../../types/book";

export const createRows = (books: FetchedBook[]) => {
  const rows: BookRow[] = books.map((book) => {
    const {
      bookId,
      title,
      authorName,
      genre,
      borrow,
      returnDate,
      updateAt,
      docId,
    } = book
    return { id: docId, bookId, title, authorName, genre, borrow: borrow ? "可" : "不可", returnDate, updateAt: formatDate(updateAt.toDate()) }
  });
  return rows
}