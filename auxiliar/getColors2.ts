export const getColorNoDinamic = (
  v: number,
  accentColor: string,
  fireColor: string,
  sheetColor: string,
) => {
  if (v <= 400) return sheetColor;
  if (v <= 649) return accentColor;
  return fireColor;
};
