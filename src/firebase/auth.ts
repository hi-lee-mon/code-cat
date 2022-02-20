import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";

/**
 * サインアップ
 * @param email 
 * @param password 
 * @returns 
 */
export const basicSignin = async (email: string, password: string) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return {
      isSuccess: true,
      user: cred.user,
    }
  } catch (error) {
    return {
      isSuccess: false,
      user: null,
    }
  }
}

/**
 * 匿名ログイン
 * @returns 
 */
export const anonymouslyLogin = async () => {
  try {
    const cred = await signInAnonymously(auth);
    return {
      isSuccess: true,
      user: cred.user,
    }
  } catch (error) {
    return {
      isSuccess: false,
      user: null,
    }
  }
}

/**
 * ログイン
 * @param email 
 * @param password 
 * @returns 
 */
export const basicLogin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    throw e
  }
}

/**
 * ログアウト
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    throw e
  }
};