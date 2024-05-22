#!/usr/bin/python3
""" LRUCache """
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """a caching system"""
    def __init__(self,):
        """initialisation"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """add value to dict"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            if key in self.cache_data:
                self.cache_data.move_to_end(key)
            else:
                last_key = list(self.cache_data.keys())[0]
                print(f"DISCARD: {last_key}")
                del self.cache_data[last_key]
        self.cache_data[key] = item

    def get(self, key):
        """get value from dict"""
        if key is None or key not in self.cache_data:
            return None
        self.cache_data.move_to_end(key)
        return self.cache_data.get(key)
