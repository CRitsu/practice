#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
About manipulate file.
"""
import os
import logging
logging.basicConfig(level=logging.DEBUG)


def manipulate_file():

    # Write file to (root)/resource/test.txt
    filename = r'%s%sresource%stest.txt' % (
        os.path.abspath('%s%s..' % (os.path.dirname(os.getcwd()), os.path.sep)),
        os.path.sep,
        os.path.sep
    )
    filename = filename.replace('\\', '/')
    logging.debug(filename)
    # Open file to write.
    with open(filename, 'w') as f:
        f.write('Test hello, test world!')
    # Open file to read.
    with open(filename, 'r') as f:
        print(f.read())
    # with clause can close resource automatically.
    # Remove the file finally.
    os.remove(filename)


if __name__ == '__main__':
    manipulate_file()
