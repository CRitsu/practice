#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Store variable to local from python.
Pickle in python is just like serialize in Java.
"""
import pickle
import json


def pickle_target():
    target = 'Okay, I\' m be pickled.'
    result = pickle.dumps(target)
    print(result)
    print(type(result))


def json_target():
    target = {'json' : 'convenience', 'binary' : 'okay'}
    result = json.dumps(target)
    print(result)
    print(type(result))
    result = json.loads(result)
    print(result)
    print(type(result))


if __name__ == '__main__':
    pickle_target()
    json_target()
