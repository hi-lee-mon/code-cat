import { useRecoilValue } from "recoil";
import { navbarState } from "../../globalState/navbarState";

export const useNavbar = () => {
  return useRecoilValue(navbarState);
}
