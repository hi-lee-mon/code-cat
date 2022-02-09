import { collection, DocumentSnapshot, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { FetchedBook } from "../types/book";

// book型チェック
const asBook = (doc: DocumentSnapshot) => {
  const book = doc.data();
  const errorMsg = "通信エラー"
  // 型チェック
  if (typeof book === "undefined") throw new Error(errorMsg)
  if (!("id" in book)) throw new Error(errorMsg)
  if (!("title" in book)) throw new Error(errorMsg)
  if (!("lastName" in book)) throw new Error(errorMsg)
  if (!("firstName" in book)) throw new Error(errorMsg)
  if (!("genre" in book)) throw new Error(errorMsg)
  if (!("updateDate" in book)) throw new Error(errorMsg)
  // 型を確定させて返却
  return { ...doc.data({ serverTimestamps: "estimate" }) } as FetchedBook
}

/**
 *
 * @returns 本の情報を返す
 */
export const useFetchBooks = () => {
  const [books, setBooks] = useState<FetchedBook[]>([]);

  /**
 * リアルタイムでコレクションデータを取得
 */
  useEffect(() => {
    const colRef = collection(db, "book");
    // id順でクエリ
    const q = query(colRef, orderBy("id"));

    // 対象のドキュメントに変更か差分があったときのみ動く
    const unSub = onSnapshot(q, (querySnapshot) => {
      // get collection data
      try {
        const book = querySnapshot.docs.map(asBook);
        setBooks(book);
      } catch (error) {
        alert(error)
      }
    })
    return unSub;
  }, [])

  return books
}