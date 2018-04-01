#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
Simple logger unit test.
"""
import unittest
from crawler.crawler_douban import simple_logger


class LoggerTest(unittest.TestCase):

    def __init__(self, *args):
        super().__init__(*args)
        self.logger = simple_logger.get_logger()

    @simple_logger.log
    def target(self, **kwargs):
        # do something here.
        print(kwargs)

    @simple_logger.log
    def test_logger(self):
        self.target(test='asb')

    @simple_logger.log
    def test_get_logger(self):
        self.assertIsNotNone(simple_logger.get_logger())
        self.assertEqual(simple_logger.get_logger().name, 'logger')

    @simple_logger.log
    def test_init_logger(self):
        self.logger.info('Do something.')


if __name__ == '__main__':
    unittest.main()
