#!/usr/bin/env python3
""" function named index_range that takes
two integer arguments page and page_size
"""
import csv
import math
from typing import List, Any, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """some docstring"""
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        starting, ending = index_range(page, page_size)
        if starting >= len(self.dataset()):
            return []
        return self.dataset()[starting:ending]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """some docstring"""

        data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)
        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": 0 if not data else page_size,
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages,
        }


def index_range(page, page_size) -> tuple:
    """ return a tuple of size two containing a
     start index and an end index corresponding to the range
     of indexes to return in a list for those particular
     pagination parameters.
     """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
