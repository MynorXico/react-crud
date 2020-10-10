def buildSheet(data):
    return {
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
        'user_id': data.get('user_id', None)
    }