import { DefectJsonTypes } from "../types";
import { INJECT_DEFECTS, UPDATE_DEFECTS_BY_DATE } from "./types";

interface DefectState {
  type: typeof INJECT_DEFECTS | typeof UPDATE_DEFECTS_BY_DATE;
  data: DefectJsonTypes;
}

const initialState = {
  defects: [],
  loading: false,
  error: null,
};


const defectReducer = (state = initialState, action: DefectState) => {
  switch (action.type) {
    case INJECT_DEFECTS:
      return {
        ...state,
      };
    case UPDATE_DEFECTS_BY_DATE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default defectReducer;