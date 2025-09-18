export const getDayMoments = (): "días" | "tardes" | "noches" => {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return "días";
  if (hora >= 12 && hora < 19) return "tardes";
  return "noches";
};
