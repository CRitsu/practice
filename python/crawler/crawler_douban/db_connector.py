#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
Database connector.
Create database connection and store data into database.
"""
import mysql.connector
import functools
from crawler.crawler_douban import simple_logger


def check_table_exists(func):
    """Check is the target table exists or not, and create it if not exists."""
    @functools.wraps(func)
    def wrapper(self, *args, **kwargs):
        conn = DatabaseAccessor.get_connection(self)
        cursor = conn.cursor()
        cursor.execute("show tables like '%s'" % DatabaseAccessor.table)
        target = cursor.fetchone()
        if not target:
            cursor.execute(
                'CREATE TABLE {} ('
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
                'comments INT,'
                'description VARCHAR(200)'
                ')'.format(DatabaseAccessor.table)
            )
            conn.commit()
        cursor.close()
        conn.close()
        return func(self, *args, **kwargs)

    return wrapper


class DatabaseAccessor(object):
    """Create connection and access database."""

    table = 'movies_info'

    def __init__(self, *, user='root', password='root', database='pytest'):
        """Initial database configuration with default parameter, or given parameter."""
        self._logger = simple_logger.get_logger()
        self.__user = user
        self.__password = password
        self.__database = database
        # put a placeholder
        self.__conn = None

    @property
    def logger(self):
        return self._logger

    def __str__(self):
        return 'DatabaseAccessor.instance: {}'.format(self.__database.upper())

    @staticmethod
    def format_value(value):
        return value.replace("'", r"\'")

    def get_connection(self):
        """Return singleton connection instance."""
        return self.__conn if self.__conn else mysql.connector.connect(
            user=self.__user,
            password=self.__password,
            database=self.__database
        )

    @simple_logger.log
    @check_table_exists
    def save(self, data):
        """Save data into target table. In this situation, into pytest.movies_info. Return rowcount."""
        if not isinstance(data, list):  # check parameter
            raise TypeError("need list type but got '%s'" % data.__class__.__name__)
        count = 0
        values = []
        for item in data:  # format data to str
            values.append("('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" %
                          (
                              self.format_value(item['chinese_name']),
                              self.format_value(item['foreign_name']),
                              self.format_value(item['alias']),
                              self.format_value(item['director']),
                              self.format_value(item['starring']),
                              self.format_value(item['release_year']),
                              self.format_value(item['country']),
                              self.format_value(item['category']),
                              self.format_value(item['point']),
                              self.format_value(item['comments']),
                              self.format_value(item['description'])
                          ))
            count = count + 1
        self._logger.info('Record count: [%d]' % count)
        row_count = 0
        if len(values) != 0:  # make sql
            sql = "INSERT INTO {} (chinese_name, foreign_name, alias, director, starring,release_year, " \
                  "country, category, point, comments, description) VALUES {} ".format(DatabaseAccessor.table,
                                                                                       ','.join(values))
            self._logger.info(sql)
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute(sql)
            conn.commit()
            row_count = cursor.rowcount
            cursor.close()
            conn.close()
        return row_count


if __name__ == '__main__':
    print('Hello, nothing here!')
