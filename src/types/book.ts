export type InputBookData = {
  bookId: string;
  title: string;
  authorName: string;
  genre: string;
}

export type Book = InputBookData & {
  borrow: boolean;
  returnDate: string | null;
  updateAt: any
}

export type FetchedBook = Book & {
  docId: string
}

export type BookRow = Omit<Book, "borrow"> & {
  borrow: string,
  id: string
}

export type UpdateBook = {
  docId: string,
  book: Book
}