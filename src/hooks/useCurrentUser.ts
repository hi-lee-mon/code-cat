import { onAuthStateChanged, User } from 'firebase/auth';
import { useState } from 'react'
import { auth } from '../firebase/config';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user)
    console.log(user?.uid)
  });
  return currentUser
}



