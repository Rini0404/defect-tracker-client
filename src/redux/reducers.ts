import { DefectCategory, DefectData, DefectJsonTypes, defectCategoryMapping } from "../types";
import { ADD_SINGLE_DEFECT, INJECT_DEFECTS, SET_DATE_RANGE, UPDATE_DEFECTS_BY_DATE } from "./types";

interface DataType {
  allDefects: DefectJsonTypes;
  organizedDefects: DefectJsonTypes;
  loading: boolean;
  error: any;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
}

interface DefectState {
  type: typeof INJECT_DEFECTS | typeof SET_DATE_RANGE | typeof UPDATE_DEFECTS_BY_DATE | typeof ADD_SINGLE_DEFECT;
  data: DataType;
  defect: { defectType: string; timestamp: string; defectCategory: DefectCategory };
}


const initialState: DataType = {
  allDefects: {},
  organizedDefects: {},
  loading: false,
  error: null,
  dateRange: {
    startDate: null,
    endDate: null,
  },
};


const defectReducer = (state = initialState, action: DefectState) => {
  switch (action.type) {
    case INJECT_DEFECTS:
      return {
        ...state,
        allDefects: action.data,
      };
    case SET_DATE_RANGE:
      return {
        ...state,
        dateRange: {
          startDate: action.data.dateRange.startDate,
          endDate: action.data.dateRange.endDate,
        },
      };

    case UPDATE_DEFECTS_BY_DATE: {
      console.log("ALL DEFECTS ", state.allDefects)
      const { startDate, endDate } = state.dateRange;

      const start = startDate ? new Date(startDate) : new Date(0);
      start.setHours(0, 0, 0, 0);
      const end = endDate ? new Date(endDate) : new Date();
      end.setHours(23, 59, 59, 999);

      console.log("Adjusted START DATE: ", start);
      console.log("Adjusted END DATE: ", end);

      const organizedDefects: DefectJsonTypes = {};

      // Iterate over each defect category
      Object.keys(defectCategoryMapping).forEach(categoryKey => {
        const categoryDefectTypes = defectCategoryMapping[categoryKey as keyof typeof defectCategoryMapping];
        organizedDefects[categoryKey] = {};
        // Filter defects of each type within the category
        categoryDefectTypes.forEach(defectType => {
          const defectTypeArray = state.allDefects[categoryKey]?.[defectType];
          if (defectTypeArray) {
            organizedDefects[categoryKey][defectType] = defectTypeArray.filter((defect: DefectData) => {
              const parts = defect.timestamp.split('-');
              const defectDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

              console.log(`Defect Timestamp: ${defectDate}, Defect Type: ${defectType}`);
              return defectDate >= start && defectDate <= end;
            });
          }
        });
      });

      console.log("UPDATE_DEFECTS_BY_DATE", organizedDefects);

      return {
        ...state,
        organizedDefects,
      };
    }


    case ADD_SINGLE_DEFECT: {
      const { defectType, timestamp, defectCategory } = action.defect;
      const newDefect = { defectType, timestamp, category: defectCategory };

      // Update allDefects
      const updatedAllDefects = {
        ...state.allDefects,
        [defectCategory]: {
          ...state.allDefects[defectCategory],
          [defectType]: [
            ...(state.allDefects[defectCategory]?.[defectType] || []),
            newDefect,
          ],
        },
      };

      // Parse the defect date as local time
      const parts = timestamp.split('-');
      const defectDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      // Adjusted start and end dates to cover the entire day
      const start = state.dateRange.startDate ? new Date(state.dateRange.startDate) : new Date(0);
      start.setHours(0, 0, 0, 0);
      const end = state.dateRange.endDate ? new Date(state.dateRange.endDate) : new Date();
      end.setHours(23, 59, 59, 999);

      let updatedOrganizedDefects = { ...state.organizedDefects };

      if (defectDate >= start && defectDate <= end) {
        updatedOrganizedDefects = {
          ...state.organizedDefects,
          [defectCategory]: {
            ...state.organizedDefects[defectCategory],
            [defectType]: [
              ...(state.organizedDefects[defectCategory]?.[defectType] || []),
              newDefect,
            ],
          },
        };
      }

      return {
        ...state,
        allDefects: updatedAllDefects,
        organizedDefects: updatedOrganizedDefects,
      };
    }


    default:
      return state;
  }
};

export default defectReducer;