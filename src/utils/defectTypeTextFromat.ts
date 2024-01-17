export const formatDefectType = (defectType: string) => {
  // Split the string at each uppercase letter and join with a space
  return defectType.replace(/([A-Z])/g, " $1").trim();
};
