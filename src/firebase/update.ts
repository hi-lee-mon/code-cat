import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { UpdateBook } from "../types/book";
import { db } from "./config";

export const updateBookService = async (param: UpdateBook) => {
  const bookRef = doc(db, "book", param.docId);
  const data = { ...param.book }
  try {
    await updateDoc(bookRef, data);
  } catch (error) {
    throw error
  }
}