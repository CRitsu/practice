#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-

"""

A program that solve the quadratic equation.

It solve the quadratic equation like this:

    ax^2 + bx + c = 0

The caller need to provide the parameter a, b and c,
then the program will return two roots of this quadratic equation.
    (x1, x2)

Parameters should be meet two precondition below:
    a != 0 -> If a = 0, then the equation is linear, not quadratic.
    b^2 - 4ac > 0
If parameters don't meet the preconditions, then a TypeError will
be raised.

"""

import math


def quadratic(a, b, c):
    a, b, c = check_parameter(a, b, c)
    return (-b + math.sqrt(b * b - 4 * a * c)) / (2 * a), \
           (-b - math.sqrt(b * b - 4 * a * c)) / (2 * a)


def check_parameter(a, b, c):
    try:
        a = int(a)
        b = int(b)
        c = int(c)
    except ValueError:
        raise ValueError('Parameters should be int')
    if a == 0:
        raise ValueError('a should not be 0')
    if b * b - 4 * a * c <= 0:
        raise ValueError('b^2 - 4ac should great than 0')
    return a, b, c


if __name__ == '__main__':
    ipt = []
    for i in range(3):
        ipt.append(input('Input the parameter which place at '
                         + str(i + 1) + '\n'))

    tem = quadratic(ipt[0], ipt[1], ipt[2])
    print(tem)
