#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Do some unit tests.
"""
import unittest


class Target(dict):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def __getattr__(self, item):
        try:
            return self[item]
        except KeyError:
            raise AttributeError(r'Target object has no attribute named \'%s\'' % item)

    def __setattr__(self, key, value):
        self[key] = value


class TestClass(unittest.TestCase):
    def test_init(self):
        t = Target(a=109, SKY='blue')
        self.assertEqual(t['a'], 109, 'Test Failed')
        self.assertEqual(t['SKY'], 'blue', 'Oh, Failed.')

    def test_setter(self):
        t = Target()
        t['test'] = 'TEST_VALUE'
        self.assertEqual(t['test'], 'TEST_VALUE')

    def test_key_error(self):
        t = Target()
        with self.assertRaises(KeyError):
            print(t['a'])

    def test_not_empty(self):
        t = Target(a='a')
        print(t)
        self.assertIsNotNone(t['a'], 'Oh, wrong.')

    def setUp(self):
        print('Setting up...')

    def tearDown(self):
        print('Finishing...')


if __name__ == '__main___':
    unittest.main()
