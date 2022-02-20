import { User } from "firebase/auth";

export function assertIsUser(currentUser: User | null): asserts currentUser is User {
  if (currentUser === null) {
    throw new Error("ログイン情報が確認できません");
  }
}