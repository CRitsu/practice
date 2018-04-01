#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
A crawler crawls douban.
2018-01-28 00:12:54.747354
"""
import requests
import time
from bs4 import BeautifulSoup
from crawler.crawler_douban.db_connector import DatabaseAccessor
from crawler.crawler_douban import simple_logger


class DoubanCrawler(object):
    """Crawler crawls douban."""

    def __init__(self, url):
        """Initial with start url."""
        self.__url = url
        self._logger = simple_logger.get_logger()

    @staticmethod
    @simple_logger.log
    def get_data(url):
        """Request html content."""
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' \
                     'Chrome/63.0.3239.132 Safari/537.36'
        headers = {'User-Agent': user_agent}
        return requests.get(url, headers).content

    @staticmethod
    def initial_item():
        """Initial item to empty entity dictionary."""
        return {'chinese_name': '', 'foreign_name': '', 'alias': '', 'director': '', 'starring': '', 'release_year': '',
                'country': '', 'category': '', 'point': '', 'comments': '', 'description': ''}

    @simple_logger.log
    def parse_html(self, data):
        """Parser."""
        html = BeautifulSoup(data, 'html.parser')
        item_group = html.find_all('div', class_='item')
        result = []
        for item in item_group:  # parse data to entity and append to result list
            div_hd = item.find('div', class_='hd')  # get header
            div_bd = item.find('div', class_='bd')  # get body

            dic = self.initial_item()  # get empty entity

            title = div_hd.find_all('span', class_='title')  # title include chinese title and foreign title
            if len(title) > 0:  # just don't want to write it twice
                dic['chinese_name'] = title[0].get_text()
            if len(title) is 2:  # if length equals 2 then value of 'foreign_name' is exists
                dic['foreign_name'] = title[1].get_text().replace(u'\xa0', '').replace('/', '')  # remove &nbsp; and '/'

            other = div_hd.find('span', class_='other').get_text().replace(u'\xa0', '').split('/')
            if len(other) > 0:
                dic['alias'] = ','.join([x.strip() for x in other if x.strip()])  # remove empty item and format

            detail = div_bd.find('p').get_text().strip().split(u'\n')  # get detail and split by line break
            staff = detail[0].replace('...', '').split(u'\xa0\xa0\xa0')  # first line includes director and starring
            info = detail[1].replace(u'\xa0', '').strip().split('/')  # second line includes rest

            if len(staff) > 0:
                directors = staff[0].replace(u'导演:', '').split('/')
                dic['director'] = ','.join(x.strip() for x in directors if x.strip())
            if len(staff) is 2:
                if '主演:' in staff[1]:
                    starring = staff[1].replace(u'主演:', '').split('/')
                    dic['starring'] = ','.join(x.strip() for x in starring if x.strip())

            if len(info[0]) is 4:  # just in case
                dic['release_year'] = info[0]
            dic['country'] = ','.join(info[1].split(' '))
            dic['category'] = ','.join(info[2].split(' '))

            star = div_bd.find('div', class_='star')
            dic['point'] = star.find('span', class_='rating_num').get_text()
            dic['comments'] = star.find_all('span')[-1].get_text()[:-3]  # last span and remove last 3 characters

            quote = div_bd.find('p', class_='quote')
            if quote:
                dic['description'] = quote.find('span').get_text()  # get description

            result.append(dic)

        next = html.find('link', rel='next')
        if next:
            return result, self.__url + next['href']
        return result, None

    @simple_logger.log
    def run(self):
        """Runner."""
        url = self.__url
        save_data = []
        while url:
            data = self.get_data(url)
            result, url = self.parse_html(data)
            save_data = [*save_data, *result]
            if url:  # if next page exists sleep 1 second and go on
                time.sleep(1)
        if save_data:
            accessor = DatabaseAccessor()
            return accessor.save(save_data)


if __name__ == '__main__':
    start_url = 'https://movie.douban.com/top250'
    crawler = DoubanCrawler(start_url)
    assert crawler.run() == 250
