import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { updateBookParam } from "../types/book";
import { db } from "./config";

export const updateBookService = async (param: updateBookParam) => {
  const bookRef = doc(db, "book", param.id);
  const data = { ...param.book, updateDate: serverTimestamp() }
  try {
    await updateDoc(bookRef, data);
  } catch (error) {
    throw error
  }
}