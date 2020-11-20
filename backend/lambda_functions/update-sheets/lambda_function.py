from dynamodb.handlers import sheet_handler

def lambda_handler(event, context):
    return sheet_handler.update(event)
     