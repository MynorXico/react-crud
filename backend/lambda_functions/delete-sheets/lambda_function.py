from dynamodb.handlers import sheet_handler

def lambda_handler(event, context):
    print(event)
    return sheet_handler.delete(event)