import { Book } from "../../../../types/book"

export const isEmptyBookAddInput = (book: Book) => {
  if (book.bookId === "") return true
  if (book.title === "") return true
  if (book.firstName === "") return true
  if (book.lastName === "") return true
  if (book.genre === "") return true
  return false;
}