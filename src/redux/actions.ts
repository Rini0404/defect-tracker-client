import { DefectJsonTypes } from "../types";
import { INJECT_DEFECTS, SET_DATE_RANGE } from "./types";




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


const updateDefectsByDate = () => {
    return {
        type: 'UPDATE_DEFECTS_BY_DATE'
    }
}

export const injectAndUpdateDefects = (data: DefectJsonTypes) => {
    return (dispatch: (arg0: any) => void) => {
        dispatch(injectDefects(data))
        dispatch(updateDefectsByDate())
    }
}
