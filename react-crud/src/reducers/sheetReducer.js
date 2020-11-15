import initialState from './initialState';
import {
    FETCH_SHEETS,
    RECEIVE_SHEETS,
    START_DELETING_SHEETS,
    FINISH_DELETING_SHEETS,
    START_CREATING_SHEET,
    FINISH_CREATING_SHEET,
    START_FETCHING_SHEET,
    FINISH_FETCHING_SHEET,
    START_UPDATING_SHEET,
    FINISH_UPDATING_SHEET,
    UNAUTHORIZED_SHEET
} from "../actions/actionTypes";

export default function sheet(state = initialState.sheet, action) {
    console.log("Reducing action: ", action);
    switch (action.type) {
        case FETCH_SHEETS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_SHEETS:
            return {
                ...state,
                sheets: action.sheets,
                isFetching: false
            };
        case START_DELETING_SHEETS:
            return {
                ...state,
                isDeleting: true
            };
        case FINISH_DELETING_SHEETS:
            return {
                ...state,
                isDeleting: false
            }
        case START_CREATING_SHEET:
            return {
                ...state,
                isCreating: true
            }
        case FINISH_CREATING_SHEET:
            return {
                ...state,
                isCreating: false
            }
        case START_FETCHING_SHEET:
            return {
                ...state,
                isFetchingSheet: true
            }
        case FINISH_FETCHING_SHEET:
            return {
                ...state,
                isFetchingSheet: false,
                sheet: action.sheet
            }
        case START_UPDATING_SHEET:
            return {
                ...state,
                isUpdating: true
            }
        case FINISH_UPDATING_SHEET:
            return {
                ...state,
                isUpdating: false
            }
        case UNAUTHORIZED_SHEET:
            return {
                ...state,
                notAuthorized: true
            }
        default:
            return state;
    }
}