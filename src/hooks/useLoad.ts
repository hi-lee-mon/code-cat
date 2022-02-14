import { useState } from "react";

export const useLoad = () => {
  const [load, setLoad] = useState(false);
  const loading = () => setLoad(true);
  const loadCompleted = () => setLoad(false);
  return [load, { loading, loadCompleted }] as const
}
