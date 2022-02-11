import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notAuthPaths = useMemo(() => ['/login', '/signin'], []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      /* ログインしているかつ notAuthPaths にいる場合 */
      if (user && notAuthPaths.includes(location.pathname))
        return navigate('/bookManagement');
      /* ログインしていないかつ notAuthPaths にいない場合 */
      if (!user && !notAuthPaths.includes(location.pathname))
        return navigate('/login');
    });
  }, [location, navigate, notAuthPaths]);
};