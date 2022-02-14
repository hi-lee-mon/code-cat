import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Book } from "../types/book";
import { db } from "./config";

/**
 * bookコレクションにデータを追加
 */
export const addBookService = async (book: Book) => {
  const { bookId, title, firstName, lastName, genre } = book
  // collection Ref
  const colRef = collection(db, "book");
  const data = {
    bookId,
    title,
    firstName,
    lastName,
    genre,
    updateDate: serverTimestamp(),
  }
  try {
    await addDoc(colRef, data);
  } catch (error) {
    throw error
  }
}

