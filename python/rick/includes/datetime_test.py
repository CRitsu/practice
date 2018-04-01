#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Batteries includes python.
About datetime.
"""


if __name__ == '__main__':
    from datetime import datetime
    t = datetime(2018, 1, 25, 15, 45, 59, 125555)
    print(t)
    print(t.timestamp())
    print(datetime.utcfromtimestamp(t.timestamp()))


