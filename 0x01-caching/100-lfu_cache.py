#!/usr/bin/python3
""" LFUCache """
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """a caching system"""
    def __init__(self,):
        """initialisation"""
        super().__init__()
        self.cache_data = OrderedDict()
        self.access_counts = {}

    def put(self, key, item):
        """add value to dict"""
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.cache_data[key] = item
            self.access_counts[key] += 1
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_key = min(self.access_counts, key=self.access_counts.get)
                lfu_keys = []
                for k, v in self.access_counts.items():
                    if v == self.access_counts[lfu_key]:
                        lfu_keys.append(k)
                # in case of a tie
                if len(lfu_keys) > 1:
                    lfu_key = next(k for k in self.cache_data if k in lfu_keys)

                print(f"DISCARD: {lfu_key}")
                del self.cache_data[lfu_key]
                del self.access_counts[lfu_key]
            self.cache_data[key] = item
            self.access_counts[key] = 1

    def get(self, key):
        """get value from dict"""
        if key is None or key not in self.cache_data:
            return None
        self.access_counts[key] += 1
        return self.cache_data.get(key)
