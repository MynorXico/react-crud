import boto3
from botocore.exceptions import ClientError

class DatabaseClient(object):
    def __init__(self, config):
        self._config = config
        self.connect(self._config)
    
    def connect(self, config):
        self.dynamodb = boto3.resource('dynamodb')
    
    def insert(self, table_name, data):
        table = self.dynamodb.Table(table_name)
        response = table.put_item(Item=data)
        return response

    def update(self, table_name, data):
        table = self.dynamodb.Table(table_name)
        sheet = data
        response = table.update_item(
            Key={
                'id':sheet['id']
            },
            UpdateExpression="set description=:description,image=:image,composition_date=:composition_date,title=:title,artist=:artist,#dur_keyword=:dur,date_modified=:date_modified,signature=:signature,href=:href,tempo=:tempo",
            ExpressionAttributeValues={
                ':description': sheet['description'],
                ':image': sheet['image'],
                ':composition_date': sheet['composition_date'],
                ':title': sheet['title'],
                ':artist': sheet['artist'],
                ':dur': sheet['duration'],
                ':date_modified': sheet['date_modified'],
                ':signature': sheet['signature'],
                ':href': sheet['href'],
                ':tempo': sheet['tempo']
            },
            ExpressionAttributeNames={
                '#dur_keyword': 'duration'
            },
            ReturnValues="UPDATED_NEW"
        )
        return response

    def get(self, table_name, id):
        table = self.dynamodb.Table(table_name)
        scan_kwarg = {
        'FilterExpression': 'user_id = :val',
        'ExpressionAttributeValues': {':val': id}
        }
        done = False
        start_key = None
        rows = []
        i = 0
        while not done:
            i+=1
            if start_key:
                scan_kwarg['ExclusiveStartKey'] = start_key
            response = table.scan(**scan_kwarg)
            rows = rows + response.get('Items', [])
            start_key = response.get('LastEvaulatedKey', None)
            done = start_key is None
        return rows
    
    def delete_items(self, table_name, ids):
        response = [self.delete_item(table_name, id) for id in ids]
        return response

    def delete_item(self, table_name, id):
        table = self.dynamodb.Table(table_name)
        response = False
        try:
            response = table.delete_item(
                Key = {
                    'id': id
                }
            )
        except ClientError as e:
            print("Error: ")
            print(e)
            return False
        else:
            return response