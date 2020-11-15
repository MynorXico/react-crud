import uuid
from datetime import datetime
class Sheet(object):
    def __init__(self, db_client, s3_client, redis_client):
        self._db_client = db_client
        self._s3_client = s3_client
        self._redis_client = redis_client
    
    def get(self, user_id):
        memoized = self._redis_client._get(user_id)
        if(memoized != None):
            return memoized
        
        value = self._db_client.get('Sheet', user_id)
        self._redis_client._set(user_id, value)
        return value

    def set_data(self, data):
        self._data = {
            'id': data.get('id', None),
            'title': data.get('title', None),
            'description': data.get('description', None),
            'image': data.get('image', None),
            'composition_date': data.get('composition_date', None),
            'title': data.get('title', None),
            'artist': data.get('artist', None),
            'duration': data.get('duration', None),
            'date_added': data.get('date_added', None),
            'date_modified': data.get('date_modified', None),
            'signature': data.get('signature', None),
            'href': data.get('href', None),
            'created_by': data.get('created_by', None),
            'tempo': data.get('tempo', None),
            'user_id': data.get('user_id', None),
            'upload_photo': data.get('upload_photo', None)
        }
        print("dynamodb/models/sheet.py#set_data - Set data")
        print(self._data)

    def save(self):
        filename = "pdf/%s.pdf"%str(uuid.uuid1())

        self._data['id'] = str(uuid.uuid1())
        self._data['date_added'] = str(datetime.now())
        self._data['date_modified'] = self._data['date_added']

        image_base64 = self._data['upload_photo']

        del self._data['upload_photo']

        # Subir archivo a s3
        image_url = self._s3_client.save64(filename, image_base64)
        self._data['image'] = image_url
        
        # Guardar registro en base de datos
        return self._db_client.insert('Sheet', self._data)

    def update(self):
        return self._db_client.update('Sheet', self._data)

    def delete(self, ids):
        return self._db_client.delete_items('Sheet', ids)
