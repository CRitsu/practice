#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Do some test about decorator.
"""
import time
import functools


# A simple decorator.
def decorator_test(fn):
    # The wrapper need pass the parameters for target function
    # @functools.wraps(fn) set wrapper.__name__ = fn.__name__
    @functools.wraps(fn)
    def wrapper(*args, **kw):
        print('[LOG] Hey, let\'s look at the guy! He\'s doing something!')
        result = fn(*args, **kw)
        print('[LOG] Oh, he\'s done! Lol!')
        return result

    return wrapper


# A useful decorator with a message.
def decorator_timer(target):
    if not callable(target):
        def decorator_inner(fn):
            @functools.wraps(fn)
            def wrapper_inner(*args, **kw):
                print('The decorator_timer has received the message : \033[1;32m%s\033[0m and the function '
                      '\033[1;32m%s()\033[0m run at %s' % (target, fn.__name__, time.time()))
                return fn(*args, **kw)

            return wrapper_inner

        return decorator_inner
    else:
        @functools.wraps(target)
        def wrapper(*args, **kw):
            print('The decorator_timer has not received a message, the function '
                  '\033[1;32m%s()\033[0m run at %s' % (target.__name__, time.time()))
            return target(*args, **kw)

        return wrapper



@decorator_test
def do_something():
    print('Yes, I\'m doing some work...')


# The decorator receive a message to print in the log.
@decorator_timer('Executing')
def do_more_thing():
    print('I\'m working now, and now is %s' % time.time())


@decorator_timer
def do_last_thing():
    print('I\'m over the work soon, and now is %s' % time.time())


if __name__ == '__main__':
    print('----------TEST_1_START----------')
    print('\033[1;31m[BEFORE] The function will be executed is :\033[0m', do_something.__name__)

    do_something()

    print('----------TEST_2_START----------')
    print('\033[1;31m[BEFORE] The function will be executed is :\033[0m', do_more_thing.__name__)

    do_more_thing()

    print('----------TEST_3_START----------')
    print('\033[1;31m[BEFORE] The function will be executed is :\033[0m', do_last_thing.__name__)

    do_last_thing()
