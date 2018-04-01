#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Do some test about functools partial.
"""
import functools


def partial_test():
    print(int('100101', base=2))
    # Use partial function
    int2 = functools.partial(int, base=2)
    print(int2('100101'))


if __name__ == '__main__':
    partial_test()
