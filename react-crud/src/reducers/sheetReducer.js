import initialState from './initialState';
import { FETCH_SHEETS, RECEIVE_SHEETS } from "../actions/actionTypes";

export default function sheet(state = initialState.sheet, action){
    console.log("Reducing action: ", action);
    switch(action.type){
        case FETCH_SHEETS:
            console.log('FETCH_SHEETS Action')
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_SHEETS:
            console.log('RECEIVE_SHEETS Action');
            return {
                ...state,
                sheets: action.sheets,
                isFetching: false
            };
        default:
            return state;
    }
}