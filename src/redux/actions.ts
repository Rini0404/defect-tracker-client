import { INJECT_DEFECTS, UPDATE_DEFECTS_BY_DATE } from "./types";


export const injectDefects = (defects: any) => {
    return {
        type: INJECT_DEFECTS,
        payload: defects
    }
}


export const updateDefectsByDate = (defects: any) => {
    return {
        type: UPDATE_DEFECTS_BY_DATE,
        payload: defects
    }
}