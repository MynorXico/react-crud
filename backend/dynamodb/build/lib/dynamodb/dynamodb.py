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