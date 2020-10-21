from ..containers.containers import Configs, Models
import json
import uuid
from datetime import datetime
import base64



# Incluir configuraciones de s3
Configs.config={
    's3_bucket_name': 'd26m5oyvq96l0u.cloudfront.net'
}

sheet_model = Models.sheet


def fetch(event):
    id = None
    if 'multiValueQueryStringParameters' in event.keys() and event['multiValueQueryStringParameters'] != None:
        if 'id' in event['multiValueQueryStringParameters'].keys():
            id = event['multiValueQueryStringParameters']['id'][0]

    user_id = event['requestContext']['authorizer']['claims']['cognito:username']
    try:
        response = (sheet_model.get(user_id))
        if(id != None):
            for sheet in response:
                if(sheet['id'] == id):
                    return responseLambda(200, json.dumps(sheet))
            return responseLambda(404, json.dumps("Not Found: "+str(id)))
        return responseLambda(200, json.dumps(response))
    except:
        raise


def create(event):
    try:
        json.loads(str(event['body']))
    except ValueError:
        return responseLambda(400, json.dumps("JSON no válido"))
    
    user_id = event['requestContext']['authorizer']['claims']['cognito:username']
    data = json.loads(event['body'])

    data['user_id'] = user_id
    print("dynamodb/handlers/sheet_handler.py#create - setting_data for user: %s"%user_id)
    print(data)
    sheet_model.set_data(data)
    
    try:
        response = (sheet_model.save())
        return responseLambda(200, event['body'])
    except:
        raise
        #return responseLambda(200, json.dumps(event))

def update(event):
    try:
        json.loads(str(event['body']))
    except ValueError:
        return responseLambda(400, json.dumps("JSON no válido"))
    
    data = json.loads(event['body'])
    data['date_modified'] = str(datetime.now())

    sheet_model.set_data(data)

    try:
        response = sheet_model.update()
        return responseLambda(200, event['body'])
        #response = dynamo_functions.update_sheet(buildSheet(data))
    except:
        raise

def delete(event):
    try:
        params = (event['queryStringParameters'])
    except:
        return responseLambda(400, json.dumps("Params no válido"))

    ids = []

    for item in params:
        ids.append(params[item])

    try:
        response = sheet_model.delete(ids)
        return responseLambda(200, json.dumps(response))
    except:
        return responseLambda(400, json.dumps(event))
# Función genérica para HTTP Response
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