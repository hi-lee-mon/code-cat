import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div>
      Homeページ
      <Link to="/login">ログインページへ</Link>
    </div>
  )
}