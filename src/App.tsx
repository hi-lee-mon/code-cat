import { HeaderOnly } from './components/templates/HeaderOnly';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { useAuth } from './hooks/useAuth';
import { BookManagement } from './components/pages/BookManagement';
import { Home } from './components/pages/Home';
import { CustomSnackbar } from './components/molecules/CustomSnackbar';
import { Page404 } from './components/pages/Page404';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { globalDarkStyle, globalStyle } from './globalStyle';
import { defaultTheme } from './theme/defaultTheme';
import { darkTheme } from './theme/darkTheme';
import { useRecoilValue } from 'recoil';
import { themeState } from './globalState/themeState';
import { Signin } from './components/pages/Signin';

//HeaderOnlyにヘッダーネームを渡す方法
//グローバルstateとパスから動的に変更する
export const App = () => {
  const theme = useRecoilValue(themeState);
  // ログイン状態監視
  useAuth();
  return (
    <div>
      <GlobalStyles styles={theme ? globalDarkStyle : globalStyle} />
      <ThemeProvider theme={theme ? darkTheme : defaultTheme}>
        {/* Snackbar */}
        <CustomSnackbar />
        {/* Routing */}
        <Routes>
          <Route path="/login" element={<HeaderOnly><Login /></HeaderOnly>} />
          <Route path="/signin" element={<HeaderOnly><Signin /></HeaderOnly>} />
          <Route path="/bookManagement" element={<HeaderOnly><BookManagement /></HeaderOnly>} />
          <Route path="/" element={<HeaderOnly><Home /></HeaderOnly>} />
          <Route path="/*" element={<HeaderOnly><Page404 /></HeaderOnly>} />
        </Routes>
      </ThemeProvider>
    </div>

  );
}

export default App;