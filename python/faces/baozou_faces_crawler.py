#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
Simple crawler for save faces of BaoZouManHua.
"""
import logging
import functools
import requests
import time
from bs4 import BeautifulSoup

logging.basicConfig(
    format='%(asctime)s %(levelname)s %(message)s',
    level=logging.DEBUG
)
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' \
             'Chrome/63.0.3239.132 Safari/537.36'


def log(func):
    """log utility"""
    @functools.wraps(func)
    def wrapper(*args, **kw):
        logging.info('Start execute: %s' % func.__name__)
        r = func(*args, **kw)
        logging.info('End executed.')
        return r

    return wrapper


@log
def write(url, name):
    r = requests.get(url, user_agent)
    with open('../faces-tar/%s' % name, 'wb') as f:
        f.write(r.content)


@log
def get_data(url):
    headers = {'User-Agent': user_agent}
    r = requests.get(url, headers).content
    html = BeautifulSoup(r, 'html.parser')
    faces_block = html.find_all('div', class_='face-block')
    for div in faces_block:
        t = int(time.time() * 1000)
        name = '%s-%s.png' % (div.find('div', class_='title').get_text().strip(), t)
        url = div.find('div', class_='download').find('a')['href']
        write(url, name)
        time.sleep(0.2)
    next_page = html.find('a', class_='next')
    if next_page:
        get_data('http://baozoumanhua.com{}'.format(next_page['href']))


if __name__ == '__main__':
    get_data('http://baozoumanhua.com/faces/search?group=&page=1&sort=&term=')
