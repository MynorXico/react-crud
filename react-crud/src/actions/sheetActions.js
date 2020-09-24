import * as types from './actionTypes';

import * as SongService from '../services/SongsWorker';





export function fetchSheets() {
    return async dispatch => {
        dispatch({ type: types.FETCH_SHEETS })
        return SongService.getSheets()
            .then(sheets => dispatch({ type: types.RECEIVE_SHEETS, sheets }));
    }
}

export function deleteSheets(sheet_ids) {
    return async dispatch => {
        dispatch({
            type: types.START_DELETING_SHEETS
        });
        await SongService.deleteSheet(sheet_ids)
            .then(response => dispatch({ type: types.FINISH_DELETING_SHEETS }))
            .then(() => dispatch({ type: types.FETCH_SHEETS }));
        SongService.getSheets()
            .then(sheets => dispatch({ type: types.RECEIVE_SHEETS, sheets }));

    }
}

export function createSheet(sheet_data) {
    return async dispatch => {
        dispatch({
            type: types.START_CREATING_SHEET
        });
        await SongService.createSheet(sheet_data)
            .then(response => dispatch({ type: types.FINISH_CREATING_SHEET }))
    }
}

export function updateSheet(sheet_data, sheet_id){
    return async dispatch => {
        dispatch({
            type: types.START_UPDATING_SHEET
        });
        console.log("Sheet data at sheetActions", sheet_data, sheet_id);
        await SongService.updateSheet(sheet_data, sheet_id)
            .then(response => dispatch({type: types.FINISH_UPDATING_SHEET}))
    }
}

export function fetchSheet(sheet_id) {
    return async dispatch => {
        dispatch({
            type: types.START_FETCHING_SHEET
        });
        await SongService.getSheet(sheet_id)
            .then(sheet => dispatch({ type: types.FINISH_FETCHING_SHEET, sheet }))
    }
}