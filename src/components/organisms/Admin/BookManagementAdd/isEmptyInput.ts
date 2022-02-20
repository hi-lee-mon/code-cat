import { InputBookData } from "../../../../types/book"

export const isEmptyBookAddInput = (book: InputBookData) => {
  if (book.bookId === "") return true
  if (book.title === "") return true
  if (book.authorName === "") return true
  if (book.genre === "") return true
  return false;
}