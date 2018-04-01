#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Multiprocessing test.
"""
from multiprocessing import Process
from multiprocessing import Pool
from multiprocessing import Queue
import os
import time
import random


def run_func(n):
    print('Hello, %s!' % n)
    print('This process(%s) is a child of %s' % (os.getpid(), os.getppid()))


def multi_task(u):
    print('(%s) Process %s is starting...' % (u, os.getpid()))
    t = time.time()
    time.sleep(random.random() * 3)
    print('(%s) Process %s is done in %0.2f seconds.' % (u, os.getpid(), time.time() - t))


def write(q):
    print('Write process %s.' % os.getpid())
    for item in ['A', 'B', 'Rick']:
        print('Put %s to queue.' % item)
        q.put(item)
        time.sleep(random.random() * 2)


def read(q):
    print('Read process %s.' % os.getpid())
    while True:
        value = q.get(True)
        print('Get %s from queue.' % value)


def communication_process():

    q = Queue()
    pw = Process(target=write, args=(q,))
    pr = Process(target=read, args=(q,))
    pw.start()
    pr.start()
    pw.join()
    pr.terminate()
    print('Done.')


if __name__ == '__main__':
    print('\033[1;31m--------------------------------------------\033[0m')
    print('Parent process is started(%s).' % os.getpid())
    p = Process(target=run_func, args=('Rick',))
    print('Child process will be start.')
    p.start()
    p.join()
    print('All done.')
    print('\033[1;31m--------------------------------------------\033[0m')
    print('Parent process is started. (%s)' % os.getpid())
    p = Pool(4)
    for i in range(5):
        p.apply_async(multi_task, args=(i,))
    print('Waiting for child process done.')
    # Only can join after close.
    p.close()
    p.join()
    print('All done.')
    print('\033[1;31m--------------------------------------------\033[0m')
    communication_process()
