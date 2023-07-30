export const isNotEmpty = (str: string | null | undefined) => {
  if (!str) return false;
  return str.length > 0;
};
