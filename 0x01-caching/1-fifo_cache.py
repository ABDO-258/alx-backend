#!/usr/bin/python3
""" FIFOCache """

BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """a caching system"""
    def __init__(self,):
        """initialisation"""
        super().__init__()

    def put(self, key, item):
        """add value to dict"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            first_key = list(self.cache_data.keys())[0]
            print(f"DISCARD: {first_key}")
            del self.cache_data[first_key]

        self.cache_data[key] = item

    def get(self, key):
        """get value from dict"""
        return self.cache_data.get(key)
