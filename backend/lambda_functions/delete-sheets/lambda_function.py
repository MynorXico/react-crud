from pprint import pprint
from model_sheet import buildSheet

import uuid
import boto3
from botocore.exceptions import ClientError
from dynamodb import dynamo_functions

import json


def lambda_handler(event, context):
    try:
        params = (event['queryStringParameters']);
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