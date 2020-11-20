import fakeredis
import redis
from unittest.mock import Mock
from dynamodb.clients.redis_client import RedisClient



redis.Redis = Mock(wraps=fakeredis.FakeRedis)
redis.Redis.get = Mock(wraps=fakeredis.FakeRedis.get)
redis.Redis.set = Mock(wraps=fakeredis.FakeRedis.set)
redis.Redis.delete = Mock(wraps=fakeredis.FakeRedis.delete)

client = RedisClient({})


# Defining some values


def test_set_dict_value():
    assert client._set('foo', {'object': True}) == True
    assert client._get('foo') == {'object': True}

def test_set_str_value():
    assert client._set('foo', 'bar')
    assert client._get('foo') == 'bar'

def test_not_set_key():
    assert client._get('not_set') == None

def test_set_key():
    client._set('foo', 'bar')
    assert client._delete('foo') == 1
    assert client._delete('foo') == 0