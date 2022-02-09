export type Book = {
  id: string,
  title: string,
  firstName: string,
  lastName: string,
  genre: string,
}

export type FetchedBook = Book & { updateDate: any }