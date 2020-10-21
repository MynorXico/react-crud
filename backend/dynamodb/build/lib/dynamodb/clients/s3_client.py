import boto3
import base64

class S3Client(object):
    def __init__(self, config):
        self._config = config
        self.connect()

    def connect(self):
        self._s3 = boto3.resource('s3')
        self._s3_client = boto3.client('s3')

    def save64(self, filename, base64_file):
        print("Config")
        print(self._config)
        bucket_name = self._config['s3_bucket_name']
        obj = self._s3.Object(bucket_name, filename)
        obj.put(Body=base64.b64decode(base64_file))
        location = self._s3_client.get_bucket_location(Bucket=bucket_name)['LocationConstraint']
        object_url = "https://%s/%s" % (bucket_name,filename)
        return object_url