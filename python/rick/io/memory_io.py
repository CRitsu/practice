#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
About manipulate memory io.
Talk about StringIO and BytesIO.
"""
from io import StringIO
from io import BytesIO


# Memory io by String.
def memory_io():
    f = StringIO()
    f.write('Some thing write in memory.')
    f.seek(0)
    assert 'Some thing write in memory.' == f.read(), 'Something was be wrong.'
    f.seek(0)
    print(f.read())
    f.close()


# Memory io by Bytes.
def bytes_io():
    f = BytesIO()
    f.write('日本語テストね'.encode('utf-8'))
    print(f.getvalue().decode('utf-8'))

if __name__ == '__main__':
    memory_io()
    bytes_io()
