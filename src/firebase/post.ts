import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Book } from "../types/book";
import { db } from "./config";

/**
 * bookコレクションにデータを追加
 */
export const addBook = async (book: Book) => {
  const { id, title, firstName, lastName, genre } = book
  // collection Ref
  const colRef = collection(db, "book");
  const data = {
    id,
    title,
    firstName,
    lastName,
    genre,
    updateDate: serverTimestamp(),
  }
  try {
    await addDoc(colRef, data);
    return true
  } catch (error) {
    console.error("送信エラー", error)
    return false
  }
}
