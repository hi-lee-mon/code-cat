export type Book = {
  bookId: string,
  title: string,
  firstName: string,
  lastName: string,
  genre: string,
}

export type FetchedBook = Book & { id: string, updateDate: any }