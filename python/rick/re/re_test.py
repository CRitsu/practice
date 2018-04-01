#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Regular Expression.
"""
import re


def re_test():
    rule = r'[a-zA-z._]+@\w+.(.\w+)*'
    for i in ('example@abc.com', 'abc@a.bp.ed', 'ass.ddd.fff@aaa.ddd.fff', 'asd.aa.dd.ff.wqe'):
        m = re.match(rule, i)
        # assert m, 'Don\'t match.'
        if m:
            print(m.group())


if __name__ == '__main__':
    re_test()
