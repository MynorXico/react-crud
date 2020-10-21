from ..clients.database_client import DatabaseClient
from ..clients.s3_client import S3Client

from ..models.sheet import Sheet

class Configs():
    config = {
        's3_bucket_name': 'd26m5oyvq96l0u.cloudfront.net'
    }

class Clients():
    db_client = DatabaseClient(Configs.config)
    s3_client = S3Client(Configs.config)

class Models():
    sheet = Sheet(Clients.db_client, Clients.s3_client)
