#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
About metaclass.
"""


# Define metaclass.
# Create the attribute 'add' and make it like append function of list.
class MyListMetaclass(type):
    def __new__(mcs, name, bases, attr):
        attr['add'] = lambda self, value: self.append(value)
        return type.__new__(mcs, name, bases, attr)


# Create class use the metaclass we defined above.
class MyList(list, metaclass=MyListMetaclass):
    pass


if __name__ == '__main__':
    # Use type function to create class at runtime.
    Hello = type('Hello', (object,), dict(hello=lambda self: print('Hello, this class was created at runtime!')))
    h = Hello()
    h.hello()
    # We did it!
    my_list = MyList()
    # my_list.add(1)
    print('About metaclass...')
    print('Emmmmmmmmmm...')
    print('Okay, passed.')
