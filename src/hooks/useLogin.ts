import { basicLogin } from '../firebase/auth';
import { useLoad } from './useLoad';
import { useOpenSnackbar } from './useSetSnackbarState';
import { SEVERITY, G_MSG_001 } from "../constants/constants"

export const useLogin = () => {
  const { load, loading, loadCompleted } = useLoad();
  const { openBar } = useOpenSnackbar();
  /**
   * ログイン処理
   */
  const login = async (email: string, password: string) => {
    loading();
    try {
      await basicLogin(email, password);
      // ログイン成功
      openBar(G_MSG_001, SEVERITY.SUCCESS);
      loadCompleted();
    } catch (e) {
      // ログイン失敗
      const error = e as Error
      openBar(error.message, SEVERITY.WARNING);
      loadCompleted();
    }
  }
  return { load, login }
}
