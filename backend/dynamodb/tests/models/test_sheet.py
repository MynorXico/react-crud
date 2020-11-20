from dynamodb.models.sheet import Sheet

url = 'www.url.test'
redis_key = 'key'
redis_val = 'val'

valid_user_data = 'valid_user_data'
valid_user_id = 'valid_user_id'

memoized_user_id = 'valid_memoized_user_id'
memoized_user_data = 'memoized_user_data'


class MockDbClient():
    def __init__(self):
        self._data = valid_user_data
    def insert(self, table_name, data):
        return valid_user_data
    
    def update(self, table_name, data):
        return valid_user_data
    
    def delete(self, table_name, ids):
        return True

    def get(self, table_name, user_id):
        return valid_user_data

    def delete_items(self, table_name, user_ids):
        return [True]

class MockS3Client():
    def save64(self, filename, image_base64):
        return url

class MockRedisClient():
    def _get(self, _key):
        if(_key == memoized_user_id):
            return memoized_user_data
        return None
    
    def _set(self, key, value):
        return True

    def _delete(self, key):
        return 1

# Configurando clientes mockeados para inyectar
db_client       = MockDbClient()
s3_client       = MockS3Client()
redis_client    = MockRedisClient() 


sheet_model = Sheet(db_client=db_client, s3_client=s3_client, redis_client=redis_client)

def test_getting_not_cached_value():
    assert sheet_model.get(valid_user_id) == valid_user_data

def test_getting_cached_value():
    assert sheet_model.get(memoized_user_id) == memoized_user_data

def test_setting_data():
    assert sheet_model.set_data({}) == {
        'id': None,
        'title': None,
        'description': None,
        'image': None,
        'composition_date': None,
        'title': None,
        'artist': None,
        'duration': None,
        'date_added': None,
        'date_modified': None,
        'signature': None,
        'href': None,
        'created_by': None,
        'tempo': None,
        'user_id': None,
        'upload_photo': None
    }

def test_saving_data():
    sheet_model.set_data({})
    assert sheet_model.save() == valid_user_data

def test_updating_data():
    assert sheet_model.update(valid_user_id) == valid_user_data

def test_deleting_data():
    assert sheet_model.delete([], valid_user_id) == [True]