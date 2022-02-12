import { HeaderOnly } from './components/templates/HeaderOnly';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { useAuth } from './hooks/useAuth';
import { BookManagement } from './components/pages/BookManagement';
import { Home } from './components/pages/Home';
import { CustomSnackbar } from './components/organisms/Common/CustomSnackbar';
export const App = () => {
  // ログイン状態監視
  useAuth();
  return (
    <div>
      {/* Snackbar */}
      <CustomSnackbar />
      {/* Routing */}
      <Routes>
        <Route path="/bookManagement" element={<HeaderOnly><BookManagement /></HeaderOnly>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<p>404 notFoundだよ😎</p>} />
      </Routes>
    </div>

  );
}

export default App;