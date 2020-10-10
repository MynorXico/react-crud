import json
import uuid
from datetime import datetime
import base64
import boto3

from .. import dynamo_functions
from ..model.sheet import buildSheet


# Handler for create request
def create(event):
    s3 = boto3.resource('s3')
    bucket_name = 'd26m5oyvq96l0u.cloudfront.net'
    file_name_with_extention = "pdf/%s.pdf"%str(uuid.uuid1())
    try:
        json.loads(str(event['body']))
    except ValueError:
        return responseLambda(400, json.dumps("JSON no válido"))
    
    user_id = event['requestContext']['authorizer']['claims']['cognito:username']
    data = json.loads(event['body'])
    data['id'] = str(uuid.uuid1())
    data['date_added'] = str(datetime.now())
    data['date_modified'] = data['date_added']
    data['user_id'] = user_id
    #return responseLambda(200, (event['body']))
    
    
    image_base64 = data['upload_photo']
    obj = s3.Object(bucket_name, file_name_with_extention)
    obj.put(Body=base64.b64decode(image_base64))
    location = boto3.client('s3').get_bucket_location(Bucket=bucket_name)['LocationConstraint']
    object_url = "https://d26m5oyvq96l0u.cloudfront.net/%s" % (file_name_with_extention)
    data['image'] = object_url
    try:
        response = (dynamo_functions.put_sheet(buildSheet(data)))
        return responseLambda(200, event['body'])
    except:
        return responseLambda(200, json.dumps(event))
    
def fetch(event):
    id = None
    if 'multiValueQueryStringParameters' in event.keys() and event['multiValueQueryStringParameters'] != None:
        if 'id' in event['multiValueQueryStringParameters'].keys():
            id = event['multiValueQueryStringParameters']['id'][0]

    user_id = event['requestContext']['authorizer']['claims']['cognito:username']
    try:
        response = (dynamo_functions.scan_sheets(user_id))
        if(id != None):
            for sheet in response:
                if(sheet['id'] == id):
                    return responseLambda(200, json.dumps(sheet))
            return responseLambda(404, json.dumps("Not Found: "+str(id)))
        return responseLambda(200, json.dumps(response))
    except:
        raise
        return responseLambda(200, json.dumps(event))

def update(event):
    try:
        json.loads(str(event['body']))
    except ValueError:
        return responseLambda(400, json.dumps("JSON no válido"))
        
    data = json.loads(event['body'])
    data['date_modified'] = str(datetime.now())


    try:
        response = dynamo_functions.update_sheet(buildSheet(data))
        print("DynamoDB Response")
        print(response)
        return responseLambda(200, event['body'])
    except:
        raise #return responseLambda(400, json.dumps(event))

def delete(event):
    try:
        params = (event['queryStringParameters'])
    except:
        return responseLambda(400, json.dumps("Params no válido"))
        
    ids = []

    for item in params:
        print("")
        ids.append(params[item])

    try:
        response = (dynamo_functions.delete_sheets(ids))
        return responseLambda(200, json.dumps(response))
    except:
        return responseLambda(400, json.dumps(event))


def responseLambda(statusCode, data):
    return {
        'statusCode': statusCode,
        'body': data,
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        "isBase64Encoded": False
    }