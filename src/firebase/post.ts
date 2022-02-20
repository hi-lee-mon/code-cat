import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Action } from "../types/action";
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

/**
 * bookコレクションにデータを追加
 */
// TODO:引数の見直し(anyを利用しない)
export const addActionLog = async (action: Action, uid: string, data: any) => {
  // collection Ref
  const colRef = collection(db, "actionLog");
  const postData = {
    uid,
    action,
    data,
    createdAt: serverTimestamp(),
  }
  try {
    await addDoc(colRef, postData);
  } catch (error) {
    throw error
  }
}

