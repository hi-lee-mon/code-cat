import { Box } from '@mui/material'
import React from 'react'
import { BookManagementAdd } from '../organisms/Admin/BookManagementAdd'
import { BookManagementRef } from '../organisms/Admin/BookManagementRef'

export const BookManagement = () => {
  return (
    <Box m={2}>
      <BookManagementAdd />
      <BookManagementRef />
    </Box>
  )
}
