import { BookManagementAdd } from '../organisms/Admin/BookManagementAdd/BookManagementAdd'
import { BookManagementRef } from '../organisms/Admin/BookManagementRef/BookManagementRef'

export const BookManagement = () => {
  return (
    <div>
      <BookManagementAdd />
      <BookManagementRef />
    </div>
  )
}
