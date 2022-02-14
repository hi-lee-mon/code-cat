export const getCurrentLocationName = (path: string) => {
  if (path === "/") return "ホーム"
  if (path === "/login") return "ログイン"
  if (path === "/bookManagement") return "管理画面"
  return "404"
}