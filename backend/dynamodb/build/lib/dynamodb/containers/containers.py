from ..clients.database_client import DatabaseClient
from ..clients.s3_client import S3Client
from ..clients.redis_client import RedisClient

from ..models.sheet import Sheet

class Configs():
    config = {
        's3_bucket_name': 'd26m5oyvq96l0u.cloudfront.net',
        'redis_endpoint': 'redis-progra-web.tkvici.ng.0001.use1.cache.amazonaws.com'
    }

class Clients():
    db_client = DatabaseClient(Configs.config)
    s3_client = S3Client(Configs.config)
    redis_client = RedisClient(Configs.config)

class Models():
    sheet = Sheet(Clients.db_client, Clients.s3_client, Clients.redis_client)
