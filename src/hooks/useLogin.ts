import { basicLogin } from '../firebase/auth';
import { useLoad } from './useLoad';

export const useLogin = () => {
  const [load, { loading, loadCompleted }] = useLoad();
  /**
   * ログイン処理
   */
  const login = async (email: string, password: string) => {
    loading();
    try {
      await basicLogin(email, password);
      loadCompleted();
    } catch (e) {
      loadCompleted();
      throw e

    }
  }
  return { load, login }
}
