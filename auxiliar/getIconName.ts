export const getIconName = (v: number) => {
  if (v <= 400) return "water-outline";
  if (v <= 750) return "leaf-outline";
  return "flame-outline";
};
