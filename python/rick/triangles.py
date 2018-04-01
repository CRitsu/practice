#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Pascal's Triangle generator
This program can make Pascal's Triangle like this:
[1]
[1, 1]
[1, 2, 1]
[1, 3, 3, 1]
[1, 4, 6, 4, 1]
[1, 5, 10, 10, 5, 1]
...
Be careful, this generator is infinite. Make sure to give a range when call this program.
Just like:
a = triangles()
for x in range(5:
    print(next(a))
"""


def triangles():
    # My foolish idea
    c = [1, 1]
    yield [1]
    while True:
        yield c
        tar = [1]
        for i in range(1, len(c)):
            tar.append(c[i] + c[i-1])
        tar.append(1)
        c = tar


def concise_triangles():
    # Simple way to generate Pascal's Triangle.
    # If we had know the 3rd line is [1, 3, 3, 1], then we can know:
    # 1. the 4th line has 4 elements.
    # 2. the nth element in the 4th line should be 3rd's nth element + (n-1)th element.
    # It just like this:
    #   | A B C D E | F
    # x | . 1 3 3 1 | 0
    # y | 1 3 3 1 0 | .
    # The value of x + y is the value we want.
    # But when we implement it in code, we have a question: what we get when call line[-1]?
    # In python, we get the last one of the list. It will become:
    #   | A B C D E |
    # x | 0 1 3 3 1 |
    # y | 1 3 3 1 0 |
    # So, we got the simple way to make this program.
    #
    # First, make the first line.
    c = [1]
    # Then, make a infinite loop.
    while True:
        yield c
        # To get the next line, first we have to append a element with the value of 0.
        # This step is to make sure the length correctly.
        c = [*c, 0]
        # Then calculate the value of each element
        c = [c[n] + c[n-1] for n in range(len(c))]


if __name__ == '__main__':
    a = concise_triangles()
    for x in range(15):
        print(next(a))
