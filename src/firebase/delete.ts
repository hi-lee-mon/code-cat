import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";

export const deleteBook = async (docId: string) => {
  try {
    // await deleteDoc(doc(db, "book", docId));
  } catch (error) {
    throw error
  }
}