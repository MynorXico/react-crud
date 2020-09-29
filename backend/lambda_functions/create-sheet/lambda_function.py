from pprint import pprint
from model_sheet import buildSheet
from datetime import datetime
import uuid
import boto3
from botocore.exceptions import ClientError
from dynamodb import dynamo_functions

import json


def lambda_handler(event, context):
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

    try:
        response = (dynamo_functions.put_sheet(buildSheet(data)))
        return responseLambda(200, event['body'])
    except:
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