import React from 'react';
import Header from '../organisms/Header/Header';

export const HeaderOnly: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
};
