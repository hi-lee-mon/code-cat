import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notAuthPaths = useMemo(() => ['/login', '/signin'], []);

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   /* ログインしていて, notAuthPaths にいる場合 */
    //   if (user && notAuthPaths.includes(location.pathname))
    //     return navigate('/chatRoom');
    //   /* ログインしていなくて notAuthPaths にいない場合 */
    //   if (!user && !notAuthPaths.includes(location.pathname))
    //     return navigate('/login');
    //   /* ログインしていなくて notAuthPaths にいない場合 */
    //   if (location.pathname === "/")
    //     return navigate('/chatRoom');
    // });
  }, [location, navigate, notAuthPaths]);
};