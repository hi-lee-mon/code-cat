import { Box } from '@mui/system';
import React from 'react'
import { useRecoilValue } from 'recoil'
import { messageState } from '../../globalState/message'

const Message = () => {
  const message = useRecoilValue(messageState);
  return (
    <Box sx={{ minHeight: "40px" }}>
      <p style={{ color: "red" }}>{message}</p>
    </Box>
  )
}

export default Message