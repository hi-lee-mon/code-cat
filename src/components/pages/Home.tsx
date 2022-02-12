import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      Homeページ（製造中）
      <br />
      <Link to="/login">ログインページへ</Link>
    </div>
  )
}