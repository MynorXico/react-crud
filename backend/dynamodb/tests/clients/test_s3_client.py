from moto import mock_s3
import uuid

import boto3
from dynamodb.clients.s3_client import S3Client
from moto.s3 import s3_backend

bucket_name='d26m5oyvq96l0u.cloudfront.net'
filename = 'valid_file_name'
base64_file = 'VEVTVA=='

def init_bucket():
    s3 = boto3.client('s3')
    s3.create_bucket(Bucket=bucket_name)
    s3_client = S3Client({
        's3_bucket_name': bucket_name,
        's3_client': s3 
    })    
    return s3_client

@mock_s3
def test_save64():
    s3_client = init_bucket()
    response = s3_client.save64(filename, base64_file)
    assert response == "https://%s/%s" % (bucket_name, filename)