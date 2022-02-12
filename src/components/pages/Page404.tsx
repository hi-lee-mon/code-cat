import { Link } from 'react-router-dom'

export const Page404 = () => {
  return (
    <div>
      404 notFoundだよ😎
      <br />
      <Link to="/login">ログインページへ</Link>
    </div>
  )
}
