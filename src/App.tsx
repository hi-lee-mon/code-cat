import { HeaderOnly } from './components/templates/HeaderOnly';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { useAuth } from './hooks/useAuth';
import { BookManagement } from './components/pages/BookManagement';
import { Home } from './components/pages/Home';
import { CustomSnackbar } from './components/organisms/Common/CustomSnackbar';
import { Page404 } from './components/pages/Page404';
export const App = () => {
  // ログイン状態監視
  useAuth();
  return (
    <div>
      {/* Snackbar */}
      <CustomSnackbar />
      {/* Routing */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/bookManagement" element={<HeaderOnly><BookManagement /></HeaderOnly>} />
        <Route path="/" element={<HeaderOnly><Home /></HeaderOnly>} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
    </div>

  );
}

export default App;