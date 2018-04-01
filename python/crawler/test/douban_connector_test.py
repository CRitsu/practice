#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
Database connector test.
"""
import unittest
from crawler.crawler_douban import db_connector


class connector_test(unittest.TestCase):
    """Database connector tester."""

    table = 'movies_test'

    def _drop_table(self, tbl):
        """FOR TEST ONLY. Drop target table"""
        conn = db_connector.DatabaseAccessor().get_connection()  # need configure mysql
        cursor = conn.cursor()
        cursor.execute("show tables like '%s'" % tbl)
        target = cursor.fetchone()
        if target:
            cursor.execute('drop table %s' % tbl)
        cursor.close()
        conn.close()

    def test_get_connection(self):
        db_connector.DatabaseAccessor.table = 'movies_test'
        accessor = db_connector.DatabaseAccessor()  # need configure mysql
        conn_test = accessor.get_connection()
        self.assertIsNotNone(conn_test)
        cursor_test = conn_test.cursor()
        cursor_test.execute('select 1')
        self.assertEqual(cursor_test.fetchone()[0], 1)
        conn_test.close()

    def test_save(self):
        """test save data"""
        db_connector.DatabaseAccessor.table = connector_test.table
        accessor = db_connector.DatabaseAccessor()  # need configure mysql
        tem_data = [{
            'chinese_name': 'TEST_MOVIE_NAME',
            'foreign_name': 'ABC_F_NAME',
            'alias': 'ALIAS',
            'director': 'DIRECTOR',
            'starring': 'STARRING',
            'release_year': '2011',
            'country': 'CN,US',
            'category': 'ABC,DEF',
            'point': '10.1',
            'comments': '1333233',
            'description': 'bbb'
        }]
        self.assertEqual(accessor.save(tem_data), 1)
        self._drop_table(connector_test.table)

    def test_more_save(self):
        """test save more then one data"""
        db_connector.DatabaseAccessor.table = connector_test.table
        accessor = db_connector.DatabaseAccessor()  # need configure mysql
        tem_data = [{
            'chinese_name': 'TEST_MOVIE_NAME',
            'foreign_name': 'ABC_F_NAME',
            'alias': 'ALIAS',
            'director': 'DIRECTOR',
            'starring': 'STARRING',
            'release_year': '2011',
            'country': 'CN,US',
            'category': 'ABC,DEF',
            'point': '10.1',
            'comments': '1333233',
            'description': 'bbb'
        }, {
            'chinese_name': '2222',
            'foreign_name': 'FN2',
            'alias': 'AL2',
            'director': 'DR2',
            'starring': 'ST2',
            'release_year': '2012',
            'country': 'JP',
            'category': 'ABC',
            'point': '10.09',
            'comments': '4562',
            'description': 'aaa'
        }]
        self.assertEqual(accessor.save(tem_data), 2)
        self._drop_table(connector_test.table)


if __name__ == '__main__':
    unittest.main()
