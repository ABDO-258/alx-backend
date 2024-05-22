#!/usr/bin/python3
""" 0-basic_cache.py """

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """a caching system"""

    def put(self, key, item):
        """add value to dict"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """get value from dict"""
        return self.cache_data.get(key)
