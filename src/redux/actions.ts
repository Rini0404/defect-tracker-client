import { DefectCategory, DefectJsonTypes } from "../types";
import { ADD_SINGLE_DEFECT, INJECT_DEFECTS, SET_DATE_RANGE, UPDATE_DEFECTS_BY_DATE } from "./types";




const injectDefects = (data: DefectJsonTypes) => {
    return {
        type: INJECT_DEFECTS,
        data
    }
}


export const setDateRange = (startDate: string | null, endDate: string | null) => ({
    type: SET_DATE_RANGE,
    data: { dateRange: { startDate, endDate } },
});


export const updateDefectsByDate = () => {
    return {
        type: UPDATE_DEFECTS_BY_DATE
    }
}

export const addSingleDefect = (defectType: string, timestamp: string, defectCategory: DefectCategory) => {
    return {
        type: ADD_SINGLE_DEFECT,
        defect: { defectType, timestamp, defectCategory }
    }
}

export const injectAndUpdateDefects = (data: DefectJsonTypes) => {
    return (dispatch: (arg0: any) => void) => {
        dispatch(injectDefects(data))
        dispatch(updateDefectsByDate())
    }
}
