import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from '@mui/styled-engine';
import reportWebVitals from './reportWebVitals';
import { globalStyle } from './globalStyle';
import { rootTheme } from './theme/rootTheme';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles styles={globalStyle} />
      <ThemeProvider theme={rootTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
