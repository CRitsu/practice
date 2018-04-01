#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Threading test.
"""
import threading


lock = threading.Lock()
bb = 0


def task():
    global bb
    for i in range(10000000):
        # lock.acquire()
        try:
            bb = bb + 1
        finally:
            # lock.release()
            pass


if __name__ == '__main__':
    t1 = threading.Thread(target=task())
    t2 = threading.Thread(target=task())
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    # assert bb == 2000000, 'Wrong.'
    print(bb)
    print('Memo:')
    print('local_school = threading.local()')
    print('Means create a variable that thread safe.')
    print('And each thread can store own data in it.')
    print('Just like create shared dist and get value by thread name.')
    print('threading.local let it to be simple.')



