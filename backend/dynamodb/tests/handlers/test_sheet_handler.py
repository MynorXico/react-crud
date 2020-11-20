import json
from dynamodb.handlers import sheet_handler
from unittest.mock import Mock
from dynamodb.containers.containers import Models

def mock_fetch_sheet(user_id):
    if sheet_for_valid_user['user_id'] == user_id:
        return [sheet_for_valid_user]
    return []

def mock_delete_sheets(sheet_ids, user_id):
    return []

def mock_update_sheet(user_id):
    return []

global mocked_model
mocked_model = {}
def mock_set_data(data):
    mocked_model = data
    return mocked_model

def mocK_save():
    return {}
string_value_variable = 'string_value'
empty_input = {}

valid_username = 'valid_username'
valid_sheet_id = 'valid_sheet_id'
valid_sheet_title = 'valid_sheet_title'

not_valid_sheet_id = 'not_valid_sheet_id'

sheet_for_valid_user = {
    'id': valid_sheet_id,
    'title': valid_sheet_title,
    'user_id': valid_username
}

valid_request_context = {
    'authorizer': {
        'claims': {
            'cognito:username': valid_username
        }
    }
}
valid_input_with_valid_sheet_id = {
    'requestContext': valid_request_context,
    'multiValueQueryStringParameters': {
        'id': [valid_sheet_id]
    }
}
valid_input_without_sheet_id = {
    'requestContext': valid_request_context
}

valid_input_with_not_valid_sheet_id = {
    'requestContext': valid_request_context,
    'multiValueQueryStringParameters': {
        'id': [not_valid_sheet_id]
    }
}

"""
    Tests de fetch
"""
def test_fetch_422_on_not_dict_input():
    assert sheet_handler.fetch(string_value_variable)['statusCode'] == 422

def test_fetch_401_on_not_valid_user():
    assert sheet_handler.fetch(empty_input)['statusCode'] == 403

def test_fetch_single_register():
    sheet_handler.sheet_model.get = Mock(wraps=mock_fetch_sheet) 
    assert sheet_handler.fetch(valid_input_with_valid_sheet_id)['body'] == json.dumps(sheet_for_valid_user)

def test_fetch_all_registers():
    sheet_handler.sheet_model.get = Mock(wraps=mock_fetch_sheet) 
    assert sheet_handler.fetch(valid_input_without_sheet_id)['body'] == json.dumps([sheet_for_valid_user])

def test_fetch_not_found():
    sheet_handler.sheet_model.get = Mock(wraps=mock_fetch_sheet) 
    assert sheet_handler.fetch(valid_input_with_not_valid_sheet_id)['statusCode'] == 404

"""
    Delete tests
"""
def test_delete_422_on_not_dict_input():
    sheet_handler.sheet_model.delete = Mock(wraps=mock_delete_sheets) 
    assert sheet_handler.delete(string_value_variable)['statusCode'] == 422

def test_delete_400_on_not_ids2delete():
    sheet_handler.sheet_model.delete = Mock(wraps=mock_delete_sheets) 
    assert sheet_handler.delete(empty_input)['statusCode'] == 400
    assert sheet_handler.delete({'queryStringParameters': ''})['statusCode'] == 400

def test_delete_200_on_delete():
    sheet_handler.sheet_model.delete = Mock(wraps=mock_delete_sheets) 
    assert sheet_handler.delete({'requestContext':{'authorizer': {'claims':{'cognito:username': valid_username}}},'queryStringParameters': {'0':valid_sheet_id}})['statusCode'] == 200
"""
    Update tests
"""
def test_update_422_on_not_valid_input():
    sheet_handler.sheet_model.update = Mock(wraps=mock_update_sheet) 
    assert sheet_handler.update(string_value_variable)['statusCode'] == 422
    assert sheet_handler.update(empty_input)['statusCode'] == 422
    assert sheet_handler.update({'body': string_value_variable})['statusCode'] == 422

def test_update_200_on_successful_update():
    sheet_handler.sheet_model.update = Mock(wraps=mock_update_sheet) 
    assert sheet_handler.update({'requestContext': {'authorizer': {'claims': {'cognito:username': valid_username}}},'body': json.dumps(sheet_for_valid_user)})['statusCode'] == 200

"""
    Create test
"""
def test_create_not_json_body():
    assert sheet_handler.create({'body': 'NotJson'})['statusCode'] == 400

def test_create_success():
    sheet_handler.sheet_model.set_data = Mock(wraps=mock_set_data)
    sheet_handler.sheet_model.save = Mock(wraps=mocK_save)
    assert sheet_handler.create({'body': json.dumps(sheet_for_valid_user), 'requestContext': valid_request_context})['statusCode'] == 200