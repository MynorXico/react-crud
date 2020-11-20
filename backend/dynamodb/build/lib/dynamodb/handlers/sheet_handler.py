from ..containers.containers import Configs, Models
import json
import uuid
from datetime import datetime
import base64


sheet_model = Models.sheet


def fetch(event):
    id = None
    if type(event) is not dict:
        return responseLambda(422, json.dumps("Not valid format: "+str(id)))

    if not ('requestContext' in event.keys() and
            'authorizer' in event['requestContext'].keys() and
            'claims' in event['requestContext']['authorizer'].keys() and
            'cognito:username'):
        return responseLambda(403, {'message': 'Not authorized'})

    if 'multiValueQueryStringParameters' in event.keys() and event['multiValueQueryStringParameters'] != None:
        if 'id' in event['multiValueQueryStringParameters'].keys():
            id = event['multiValueQueryStringParameters']['id'][0]

    user_id = event['requestContext']['authorizer']['claims']['cognito:username']
    print("Trying")
    response = (Models.sheet.get(user_id))
    print("response: ")
    print(response)
    if(id != None):
        for sheet in response:
            print("comparing")
            print(sheet['id'])
            print(id)
            if(sheet['id'] == id):
                return responseLambda(200, json.dumps(sheet))
        return responseLambda(404, json.dumps("Not Found: "+str(id)))
    return responseLambda(200, json.dumps(response))

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
    
    sheet_model.save()
    return responseLambda(200, event['body'])

def update(event):
    if type(event) is not dict:
        return responseLambda(422, json.dumps("Not valid format: "+str(id)))

    if not ('body' in event.keys()):
        return responseLambda(422, json.dumps("Not valid format: "+str(id)))
    
    #if type(event['body']) is not dict:
    #    return responseLambda(422, json.dumps("Not valid format: "+str(id)))
    try:
        json.loads(event['body'])
    except ValueError:
        return responseLambda(422, json.dumps("Not valid format: "+str(id)))
    data = json.loads(event['body'])
    data['date_modified'] = str(datetime.now())

    sheet_model.set_data(data)
    user_id = event['requestContext']['authorizer']['claims']['cognito:username']
    sheet_model.update(user_id)
    return responseLambda(200, event['body'])

def delete(event):
    if type(event) is not dict:
        return responseLambda(422, json.dumps("Not valid format: "+str(id)))

    if not ('queryStringParameters' in event.keys() and isinstance(event['queryStringParameters'], dict)):
        return responseLambda(400, json.dumps("Params no válido"))
    
    params = (event['queryStringParameters'])

    ids = []
    user_id = event['requestContext']['authorizer']['claims']['cognito:username']

    for item in params:
        print("params")
        print(params)
        print(item)
        ids.append(params[item])

    response = sheet_model.delete(ids, user_id)
    return responseLambda(200, json.dumps(response))
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