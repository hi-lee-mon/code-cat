import { Box } from '@mui/system';
import React from 'react';
import Header from '../organisms/Layout/Header/Header';

export const HeaderOnly: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <Box m={2}>
        {children}
      </Box>
    </div>
  )
};
