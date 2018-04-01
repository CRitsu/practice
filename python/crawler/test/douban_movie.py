#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
First crawler to get movie ranks from this site:
https://movie.douban.com/top250
And save the data into database.
"""
import requests
import mysql.connector
from bs4 import BeautifulSoup
import time
import logging
logging.basicConfig(level=logging.debug)


# Where we begin.
globals_url = 'https://movie.douban.com/top250'
# MySQL configuration.
global_user = 'root'
global_password = 'root'
global_database = 'pytest'


def download_data(url):
    """Download data from given url."""
    user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' \
                 'Chrome/63.0.3239.132 Safari/537.36'
    headers = {'User-Agent': user_agent}
    data = requests.get(url, headers).content
    html = BeautifulSoup(data, 'html.parser')
    info = html.find('ol', class_='grid_view').find_all('li', recursive=False)
    next_url = url + html.find('span', class_='next').find('a')['href']
    return info, next_url


def parse_data(data):
    """Parse content from HTML tag."""
    result = []
    for item in data:
        d = {}
        title = item.find_all('span', class_='title')
        other = item.find('span', class_='other')
        staff_and_info = item.find('p', class_='')
        staff = staff_and_info.text.strip().split('\n')[0].split('主演: ')
        starring = '' if len(staff) == 1 else staff[1].replace('...', '').split('/')
        info = [x.strip() for x in staff_and_info.text.strip().split('\n')[1].strip().split('/')]
        comments = int(item.find('span', class_='rating_num')
                       .next_sibling.next_sibling.next_sibling.next_sibling.text[:-3])
        d['chinese_name'] = title[0].text
        d['foreign_name'] = '' if len(title) == 1 else title[1].text.strip()[2:]
        d['alias'] = other.text[3:].replace('  /  ', ',')
        d['director'] = staff[0][3:] if staff[0][3:].find('/') == -1 else \
            ','.join([x.strip() for x in staff[0][3:].strip().split('/') if x.find('...') != -1])
        d['starring'] = '' if not starring else \
            starring[0].strip() if len(starring) == 1 else ','.join([x.strip() for x in starring if x])
        d['release_year'] = info[0]
        d['country'] = info[1] if len(info[1].split(' ')) == 1 else ','.join(info[1].split(' '))
        d['category'] = info[2] if len(info[2].split(' ')) == 1 else ','.join(info[2].split(' '))
        d['point'] = float(item.find('span', class_='rating_num').text)
        d['comments'] = comments
        result.append(d)
    return result


def save(data):
    """Save the data into database."""
    conn = mysql.connector.connect(user=global_user, password=global_password, database=global_database)
    cursor = conn.cursor()
    cursor.execute("show tables like 'movies_info'")
    if not cursor.fetchone():
        cursor.execute(
            'CREATE TABLE movies_info ('
            'id INT PRIMARY KEY AUTO_INCREMENT,'
            'chinese_name VARCHAR(80),'
            'foreign_name VARCHAR (80),'
            'alias VARCHAR (160),'
            'director VARCHAR (80),'
            'starring VARCHAR (80),'
            'release_year VARCHAR (4),'
            'country VARCHAR (20),'
            'category VARCHAR (20),'
            'point FLOAT ,'
            'comments INT '
            ')'
        )
        conn.commit()
    for item in data:
        cursor.execute(
            'INSERT INTO movies_info ('
            'chinese_name, foreign_name, alias, director, starring, '
            'release_year, country, category, point, comments'
            ') VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
            [
                # item['id'],
                item['chinese_name'],
                item['foreign_name'],
                item['alias'],
                item['director'],
                item['starring'],
                item['release_year'],
                item['country'],
                item['category'],
                item['point'],
                item['comments']
            ]
        )
    conn.commit()
    cursor.close()


def main():
    target = globals_url
    while target:
        data, target = download_data(target)
        data = parse_data(data)
        save(data)
        if target:
            time.sleep(1)


if __name__ == '__main__':
    main()
