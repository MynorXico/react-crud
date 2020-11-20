import redis
import json

class RedisClient(object):
    def __init__(self, config):
        self._config = config
        self.connect(self._config)

    def connect(self, config):
        if(config):
            self.r = redis.Redis(config['redis_endpoint'])
        else:
            self.r = redis.Redis()

    def _get(self, key):
        value = self.r.get(key)
        if(value == None):
            return None
        try:
            return json.loads(self.r.get(key).decode('ascii'))
        except:
            return self.r.get(key).decode('ascii')
    def _set(self, key, value):
        if type(value) == str:
            return self.r.set(key, value, 60)
        return self.r.set(key, json.dumps(value), 60)

    def _delete(self, key):
        return self.r.delete(key)