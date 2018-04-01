#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
Simple logger.
"""
import logging
import functools


log_format = '%(asctime)s [%(levelname)5s] %(filename)s[line:%(lineno)d]: %(message)s'

logging.basicConfig(level=logging.DEBUG, format=log_format)
logger = logging.getLogger('logger')


def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        para = ','.join([str(x) for x in args])
        para = para + (', ' + str(kwargs) if kwargs else '')
        logger.info('Execute [%s] start parameter is [%s]' % (func.__name__, para))
        result = func(*args, **kwargs)
        logger.info('Execute [%s] end' % func.__name__)
        return result

    return wrapper


def get_logger():
    return logger


if __name__ == '__main__':
    import datetime

    logger.info('test message')


    @log
    def test_a():
        print(datetime.datetime.now(), 'Just test.')


    test_a()
