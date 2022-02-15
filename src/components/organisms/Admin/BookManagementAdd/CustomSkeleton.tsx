import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'

const skeletons = [...Array(5)].map(() => <Skeleton variant="rectangular" sx={{ width: "500px", height: "56px", borderRadius: "5px", }} />)

// TODO:スマホ用スケルトン作成
export const CustomSkeleton = () => {
  return (
    <Box sx={{ minWidth: "200px" }}>
      <Stack spacing={1}>
        <div style={{ height: "60px" }}></div>
        {
          skeletons.map((s) => s)
        }
      </Stack>
      <Box mt={2} mb={3}>
        <Skeleton variant="rectangular" sx={{ width: "100px", height: "37px", borderRadius: "10px" }} />
      </Box>
    </Box>
  )
}
