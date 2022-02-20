import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { InputBookData, Book } from "../types/book";
import { db } from "./config";

/**
 * bookコレクションにデータを追加
 */
export const addBookService = async (book: InputBookData) => {
  const { bookId, title, authorName, genre } = book
  // collection Ref
  const colRef = collection(db, "book");
  const postData: Book = {
    bookId,
    title,
    authorName,
    genre,
    borrow: true,
    returnDate: null,
    updateAt: serverTimestamp(),
  }
  try {
    await addDoc(colRef, postData);
  } catch (error) {
    throw error
  }
}

