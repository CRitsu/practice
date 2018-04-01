#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Put tests code at docs.
Run tests by import doctest and call doctest.testmod().
"""


def calculate(n):
    """

    >>> calculate(1)
    1
    >>> calculate(2)
    4
    >>> calculate(3)
    ?

    :return:
    """
    return n ** n


if __name__ == '__main__':
    import doctest
    doctest.testmod()
