import { HeaderOnly } from './components/templates/HeaderOnly';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/pages/Login';
import { useAuth } from './hooks/useAuth';
import { BookManagement } from './components/pages/BookManagement';

export const App = () => {
  useAuth();
  return (
    <Routes>
      <Route path="/" element={<HeaderOnly><BookManagement /></HeaderOnly>} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<p>404 notFoundだよ😎</p>} />
    </Routes>
  );
}

export default App;