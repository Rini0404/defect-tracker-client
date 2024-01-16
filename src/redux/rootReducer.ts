import { combineReducers } from 'redux'
import defectReducer from './reducers'


const rootReducer = combineReducers({
    defects: defectReducer
})

export default rootReducer