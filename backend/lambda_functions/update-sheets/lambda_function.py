from pprint import pprint
from model_sheet import buildSheet

import uuid
import boto3
from botocore.exceptions import ClientError
from datetime import datetime
from dynamodb import dynamo_functions

import json


def lambda_handler(event, context):
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


def responseLambda(statusCode, data):
    return {
        'statusCode': statusCode,
        'body': (data),
        "headers": {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        "isBase64Encoded": False
    }