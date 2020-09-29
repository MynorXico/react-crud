from pprint import pprint
from model_sheet import buildSheet
import uuid
from dynamodb import dynamo_functions


from botocore.exceptions import ClientError

import json


def lambda_handler(event, context):
    #return responseLambda(200, json.dumps(event['requestContext']['authorizer']['claims']))
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