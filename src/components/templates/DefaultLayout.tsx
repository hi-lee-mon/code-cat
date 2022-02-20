import { Box } from '@mui/system';
import React from 'react';
import Header from '../organisms/Layout/Header/Header';
import { Navbar } from '../organisms/Layout/Navbar/Navbar';

export const DefaultLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <Navbar />
      <Box m={2}>
        {children}
      </Box>
    </div>
  )
};
