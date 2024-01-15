import { DefectJsonTypes } from "../types";

export const countDefects = (defectsData: DefectJsonTypes): { [key: string]: number } => {
  const counts: { [key: string]: number } = {};

  // Iterate over each main defect category (e.g., HumanError, MachineError, etc.)
  Object.keys(defectsData).forEach((mainCategory) => {
    const subcategories = defectsData[mainCategory];

    if (subcategories) {
      let totalDefects = 0;

      // Iterate over each subcategory and count the defects
      Object.values(subcategories).forEach(subcategory => {
        totalDefects += subcategory.length;
      });

      counts[mainCategory] = totalDefects;
    } else {
      counts[mainCategory] = 0;
    }
  });

  const totalDefects = Object.values(counts).reduce((a, b) => a + b, 0);

  counts.total = totalDefects;

  return counts;

};
