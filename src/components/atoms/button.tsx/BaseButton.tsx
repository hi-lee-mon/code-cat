import * as React from 'react';
import { Button } from '@mui/material';

type Props = {
  children: React.ReactNode,
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
}

const style = {
  width: "150px",
  padding: "10px",
}

export const BaseButton = ({ children, color = "primary" }: Props) => {

  return (
    <Button variant="contained" color={color} sx={style}>{children}</Button>
  )
}