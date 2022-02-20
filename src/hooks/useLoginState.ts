import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/config'

export const useLoginState = () => {
  const [authState, setAuthState] = useState(auth);
  useEffect(() => {
    setAuthState(auth)
  }, [auth])
}
