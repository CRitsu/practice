#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
Douban crawler test.
"""
import unittest
from crawler.crawler_douban import crawler_douban


class crawler_test(unittest.TestCase):
    def test_get_data(self):
        crawler = crawler_douban.DoubanCrawler('')
        html = crawler.get_data('http://www.baidu.com')
        self.assertIsNotNone(html)
        print(html)

    def test_parser(self):
        start_url = 'https://movie.douban.com/top250'
        crawler = crawler_douban.DoubanCrawler('')
        html = crawler.get_data(start_url)
        print(crawler.parse_html(html))

if __name__ == '__main__':
    unittest.main()
