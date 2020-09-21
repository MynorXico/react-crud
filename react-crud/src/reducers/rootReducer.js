import { combineReducers } from 'redux';
import sheet from './sheetReducer';

const rootReducer = combineReducers({
    sheet
});

export default rootReducer;