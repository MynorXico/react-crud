import * as types from './actionTypes';

import * as SongService from '../services/SongsWorker';


function unauthorize(dispatch, err_code){
    if(err_code >= 400 && err_code < 500){
        dispatch({ type: types.UNAUTHORIZED_SHEET});
    }
}


export function fetchSheets() {
    return dispatch => {
        dispatch({ type: types.FETCH_SHEETS })
        return SongService.getSheets()
            .then(sheets => dispatch({ type: types.RECEIVE_SHEETS, sheets }))
            .catch(err_code => unauthorize(dispatch, err_code))
    }
}

export function clearSheet() {
    return async dispatch => {
        dispatch({ type: types.CLEAR_SHEET });
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
            .then(sheets => dispatch({ type: types.RECEIVE_SHEETS, sheets }))
            .catch(err_code => unauthorize(dispatch, err_code))
    }
}

export function createSheet(sheet_data) {
    return async dispatch => {
        var errors = {}
        if(sheet_data['title']=='' || sheet_data['title'] == null){
            errors['title'] = 'Por favor llenar el título'
        }
        if(sheet_data['artist']=='' || sheet_data['artist'] == null){
            errors['artist'] = 'Por favor llenar el artist'
        }
        if(sheet_data['signature']=='' || sheet_data['signature'] == null){
            errors['signature'] = 'Por favor llenar el signature'
        }
        if(sheet_data['tempo']=='' || sheet_data['tempo'] == null){
            errors['tempo'] = 'Por favor llenar el tempo'
        }
        if(sheet_data['composition_date']=='' || sheet_data['composition_date'] == null){
            errors['composition_date'] = 'Por favor llenar el composition_date'
        }
        if(sheet_data['upload_photo']=='' || sheet_data['upload_photo'] == null){
            errors['image'] = 'Por favor llenar el image'
        }

        if(sheet_data['description']=='' || sheet_data['description'] == null){
            errors['description'] = 'Por favor llenar el description'
        }
        if(Object.keys(errors).length === 0 ){
            dispatch({
                type: types.START_CREATING_SHEET
            });
            await SongService.createSheet(sheet_data)
            .then(response => dispatch({ type: types.FINISH_CREATING_SHEET }))
            .catch(err_code => unauthorize(dispatch, err_code))
        }else{
            dispatch({type: types.FOUND_ERRORS, errors});
        }
        
    }
}

export function updateSheet(sheet_data, sheet_id){
    return async dispatch => {
        var errors = {}
        if(sheet_data['title']=='' || sheet_data['title'] == null){
            errors['title'] = 'Por favor llenar el título'
        }
        if(sheet_data['artist']=='' || sheet_data['artist'] == null){
            errors['artist'] = 'Por favor llenar el artist'
        }
        if(sheet_data['signature']=='' || sheet_data['signature'] == null){
            errors['signature'] = 'Por favor llenar el signature'
        }
        if(sheet_data['tempo']=='' || sheet_data['tempo'] == null){
            errors['tempo'] = 'Por favor llenar el tempo'
        }
        if(sheet_data['composition_date']=='' || sheet_data['composition_date'] == null){
            errors['composition_date'] = 'Por favor llenar el composition_date'
        }
        if(sheet_data['image']=='' || sheet_data['image'] == null){
            errors['image'] = 'Por favor llenar el image'
        }

        if(sheet_data['description']=='' || sheet_data['description'] == null){
            errors['description'] = 'Por favor llenar el description'
        }
        if(Object.keys(errors).length === 0 ){
            dispatch({
                type: types.START_UPDATING_SHEET
            });
            await SongService.updateSheet(sheet_data, sheet_id)
                .then(response => dispatch({type: types.FINISH_UPDATING_SHEET}))
                .catch(err_code => unauthorize(dispatch, err_code))
        }else{
            dispatch({type: types.FOUND_ERRORS, errors});
        }
        
    }
}

export function fetchSheet(sheet_id) {
    return async dispatch => {
        dispatch({
            type: types.START_FETCHING_SHEET
        });
        await SongService.getSheet(sheet_id)
            .then(sheet => dispatch({ type: types.FINISH_FETCHING_SHEET, sheet }))
            .catch(err_code => unauthorize(dispatch, err_code))
    }
}