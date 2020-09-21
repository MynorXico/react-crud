import * as types from './actionTypes';

import * as SongService from '../services/SongsWorker';

export function receiveSheets(sheets) {
    return { type: types.RECEIVE_SHEETS, sheets };
}

export function startFetchingSheets(){
    return { type: types.FETCH_SHEETS}
}

export function fetchSheets(){
    return dispatch => {
        dispatch(startFetchingSheets())
        return SongService.getSheets()
        .then(response => dispatch(receiveSheets(response)));
    }
}