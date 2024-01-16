import { DefectCategory, DefectData, DefectJsonTypes } from "../types";
import { INJECT_DEFECTS, SET_DATE_RANGE, UPDATE_DEFECTS_BY_DATE } from "./types";

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
  type: typeof INJECT_DEFECTS | typeof SET_DATE_RANGE | typeof UPDATE_DEFECTS_BY_DATE;
  data: DataType;
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
      const { startDate, endDate } = state.dateRange;
      const organizedDefects: DefectJsonTypes = {};
      Object.keys(state.allDefects).forEach(categoryKey => {
        const categoryKeyAsString = categoryKey as keyof typeof DefectCategory;
        const category = state.allDefects[categoryKeyAsString];
        if (category) {
          organizedDefects[categoryKeyAsString] = {};

          Object.keys(category).forEach(defectTypeKey => {
            const defectTypeArray = category[defectTypeKey as keyof typeof category];
            if (defectTypeArray) {
              organizedDefects[categoryKeyAsString]![defectTypeKey as keyof typeof category] = defectTypeArray.filter((defect: DefectData) => {
                const defectDate = new Date(defect.timestamp);
                const start = startDate ? new Date(startDate) : new Date(0);
                const end = endDate ? new Date(endDate) : new Date();
                return defectDate >= start && defectDate <= end;
              });
            }
          });
        }
      });

      return {
        ...state,
        organizedDefects,
      };
    }
    default:
      return state;
  }
};

export default defectReducer;