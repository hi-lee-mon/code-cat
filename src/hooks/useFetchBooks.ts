import { collection, DocumentSnapshot, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SEVERITY } from "../constants/constants";
import { db } from "../firebase/config";
import { FetchedBook } from "../types/book";
import { useOpenSnackbar } from "./useSetSnackbarState";
// TODO:fetchの部分とカスタムフックを分割
// book型チェック
const asBook = (doc: DocumentSnapshot) => {
  const book = doc.data();
  const errorMsg = "データの取得に失敗しました。"
  // 型チェック
  if (typeof book === "undefined") throw new Error(`${errorMsg}_book`)
  if (!("bookId" in book)) throw new Error(`${errorMsg}_bookId`)
  if (!("title" in book)) throw new Error(`${errorMsg}_title`)
  if (!("authorName" in book)) throw new Error(`${errorMsg}_authorName`)
  if (!("genre" in book)) throw new Error(`${errorMsg}_genre`)
  if (!("borrow" in book)) throw new Error(`${errorMsg}_borrow`)
  if (!("returnDate" in book)) throw new Error(`${errorMsg}_returnDate`)
  if (!("updateAt" in book)) throw new Error(`${errorMsg}_updateAt`)
  // 型を確定させて返却
  return { ...doc.data({ serverTimestamps: "estimate" }), docId: doc.id } as FetchedBook
}

/**
 *
 * @returns 本の情報を返す
 */
export const useFetchBooks = () => {
  const [books, setBooks] = useState<FetchedBook[]>([]);
  const { openSnackbar } = useOpenSnackbar();

  /**
 * リアルタイムでコレクションデータを取得
 */
  useEffect(() => {
    const colRef = collection(db, "book");
    // id順でクエリ
    const q = query(colRef, orderBy("bookId", 'desc'), limit(15));

    // 対象のドキュメントに変更か差分があったときのみ動く
    const unSub = onSnapshot(q, (querySnapshot) => {
      // get collection data
      try {
        const book = querySnapshot.docs.map(asBook);
        setBooks(book);
      } catch (e) {
        const error = e as Error
        openSnackbar(error.message, SEVERITY.ERROR)
      }
    })
    return unSub;
  }, [openSnackbar])

  return books
}