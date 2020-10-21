import boto3

def scan_sheets(user_id: str):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Sheet')
    scan_kwarg = {
        'FilterExpression': 'user_id = :val',
        'ExpressionAttributeValues': {':val': user_id}
    }
    done = False
    start_key = None
    movies = []
    i = 0
    while not done:
        i+=1
        if start_key:
            scan_kwarg['ExclusiveStartKey'] = start_key
        response = table.scan(**scan_kwarg)
        movies = movies + response.get('Items', [])
        start_key = response.get('LastEvaulatedKey', None)
        done = start_key is None
    return movies

def put_sheet(data, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Sheet')
    response = table.put_item(Item=data)
    return response

def delete_sheets(ids):
    response = [delete_sheet(id) for id in ids]
    return response

def delete_sheet(id, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Sheet')
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

def update_sheet(data, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')
        
    table = dynamodb.Table('Sheet')
    
    sheet = data
    print("actualizando: ")
    print(sheet)
    response = table.update_item(
        Key={
            'id': sheet['id']
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