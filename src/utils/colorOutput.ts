import { palette } from "../theme";
import { DefectCategory, DefectType, defectCategoryMapping } from "../types";

export const getColorForDefectType = (defectType: DefectType) => {
  for (const [category, types] of Object.entries(defectCategoryMapping)) {
    if (types.includes(defectType)) {
      switch (category) {
        case DefectCategory.HumanError:
          return palette.pastel.red;
        case DefectCategory.MachineError:
          return palette.pastel.orange;
        case DefectCategory.ManufacturerError:
          return palette.pastel.purple;
        default:
          return "none";
      }
    }
  }
  return "none";
};
