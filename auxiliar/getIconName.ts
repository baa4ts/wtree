export const getIconName = (v: number) => {
  if (v <= 400) return "water-outline";
  if (v <= 649) return "leaf-outline";
  return "flame-outline";
};
