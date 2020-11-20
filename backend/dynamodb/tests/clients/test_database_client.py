from moto import mock_dynamodb2 
import uuid

import boto3
from dynamodb.clients.database_client import DatabaseClient
from moto.dynamodb import dynamodb_backend

valid_username = 'valid_username'
valid_sheet_id = str(uuid.uuid1())
valid_sheet_title = 'valid_sheet_title'
valid_sheet_description = 'valid_sheet_description'
valid_sheet_image = 'valid_sheet_image'
valid_sheet_composition_date = 'valid_sheet_composition_date'
valid_sheet_artist = 'valid_sheet_artist'
valid_sheet_duration = 'valid_sheet_duration'
valid_sheet_date_modified = 'valid_sheet_date_modified'
valid_sheet_signature = 'valid_sheet_signature'
valid_sheet_href = 'valid_sheet_href'
valid_sheet_tempo = 'valid_sheet_tempo'

string_value = 'string_value'
empty_dict = {}

sheet_for_valid_user = {
    'id': valid_sheet_id,
    'title': valid_sheet_title,
    'user_id': valid_username
}

sheet_with_all_fields = {
    'id': valid_sheet_id,
    'description': valid_sheet_description,
    'image': valid_sheet_image,
    'composition_date': valid_sheet_composition_date,
    'title': valid_sheet_title,
    'artist': valid_sheet_artist,
    'duration': valid_sheet_duration,
    'date_modified': valid_sheet_date_modified,
    'signature': valid_sheet_signature,
    'href': valid_sheet_href,
    'tempo': {}
}

sheet_with_all_invalid_fields = {
    'id': valid_sheet_id,
    'description': None,
    'image': None,
    'composition_date': None,
    'title': None,
    'artist': None,
    'duration': None,
    'date_modified': None,
    'signature': None,
    'href': None,
    'tempo': None
}

table_name = 'Sheet'

added_items = []


def init_table():
    dynamodb = boto3.resource('dynamodb')
    database_client = DatabaseClient({
        'dynamodb': dynamodb
    })
    database_client.create_table(
        table_name,
        [
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'
            }
        ],
        [
            {
                'AttributeName': 'id',
                'AttributeType': 'S'
            }
        ]
    )
    return database_client

@mock_dynamodb2
def test_200_on_insert():
    client = init_table()
    response = client.insert(table_name, sheet_for_valid_user)
    added_items.append(sheet_for_valid_user['id'])
    assert response==sheet_for_valid_user

@mock_dynamodb2
def test_insert_not_dict():
    client = init_table()
    response = client.insert(table_name, string_value)
    assert response == False

@mock_dynamodb2
def test_insert_dict_with_no_id():
    client = init_table()
    response = client.insert(table_name, empty_dict)
    assert response == False

@mock_dynamodb2
def test_update_not_dict():
    client = init_table()
    response = client.update(table_name, string_value)
    assert response == False

@mock_dynamodb2
def test_update_dict_with_no_id():
    client = init_table()
    response = client.update(table_name, empty_dict)
    assert response == False

@mock_dynamodb2
def test_200_on_update():
    client = init_table()
    response = client.update(table_name, sheet_with_all_fields)
    assert response == sheet_with_all_fields

@mock_dynamodb2
def test_200_delete_single_item():
    client = init_table()
    response = client.delete_item(table_name, added_items[0])
    assert response == True

@mock_dynamodb2
def test_false_on_not_string_id():
    client = init_table()
    response = client.delete_item(table_name, {})
    assert response == False

@mock_dynamodb2
def test_right_array_on_delete_items():
    client = init_table()
    response = client.delete_items(table_name, [{}, 123, '123'])
    assert response == [False, False, True]

@mock_dynamodb2
def test_get_user_id_items():
    client = init_table()
    client.insert(table_name, sheet_for_valid_user)
    response = client.get(table_name, valid_username)
    assert response == [sheet_for_valid_user]
    
    # Eliminando item para comprobar que no devuelva nada después
    client.delete_item(table_name, sheet_for_valid_user['id'])
    response = client.get(table_name, valid_username)
    assert response == []

@mock_dynamodb2
def test_get_not_string_id():
    client = init_table()
    response = client.get(table_name, empty_dict)
    assert response == False


@mock_dynamodb2
def test_delete_not_valid_id():
    client = init_table()
    response = client.delete_item(table_name, None)
    assert response == False

