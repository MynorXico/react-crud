from dependency_injector import providers, containers
from database_client import DatabaseClient
from s3_client import S3Client

from sheet import Sheet

class Configs(containers.DeclarativeContainer):
    config = providers.Configuration('config')
    # other config

class Clients(containers.DeclarativeContainer):
    db_client = providers.Singleton(DatabaseClient, Configs.config)
    s3_client = providers.Singleton(S3Client, Configs.config)

class Models(containers.DeclarativeContainer):
    sheet = providers.Factory(Sheet, db_client=Clients.db_client, s3_client=Clients.s3_client)