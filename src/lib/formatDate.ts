export const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = ('00' + (date.getMonth() + 1)).slice(-2);
  const d = ('00' + date.getDate()).slice(-2);
  const h = ('00' + date.getHours()).slice(-2);
  const mi = ('00' + date.getMinutes()).slice(-2);
  const space = " ";
  return `${y}/${m}/${d}${space}${h}:${mi}`;
};