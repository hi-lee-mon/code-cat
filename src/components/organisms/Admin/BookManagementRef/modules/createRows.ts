import { formatDate } from "../../../../../lib/formatDate";
import { FetchedBook } from "../../../../../types/book";

export const createRows = (books: FetchedBook[]) => {
  const rows = books.map((book) => {
    const { id, bookId, title, lastName, firstName, genre, updateDate } = book
    return { id, bookId, title, lastName, firstName, genre, updateDate: formatDate(updateDate.toDate()) }
  });
  return rows
}