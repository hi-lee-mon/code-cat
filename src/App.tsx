import { HeaderOnly } from './components/templates/HeaderOnly';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { useAuth } from './hooks/useAuth';
import { BookManagement } from './components/pages/BookManagement';
import { Alert, Snackbar } from '@mui/material';
import { useCloseSnackbar } from './hooks/useSetSnackbar';
import { useRecoilValue } from 'recoil';
import { snackbarMessageState, snackbarState } from './globalState/atom/snackbarState';

export const App = () => {
  // TODO:Snackbarの修正
  const { closeBar } = useCloseSnackbar();
  const open = useRecoilValue(snackbarState);
  const message = useRecoilValue(snackbarMessageState);
  // ログイン状態監視
  useAuth();
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={closeBar}>
        <Alert onClose={closeBar} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/bookManagement" element={<HeaderOnly><BookManagement /></HeaderOnly>} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<p>404 notFoundだよ😎</p>} />
      </Routes>
    </div>

  );
}

export default App;