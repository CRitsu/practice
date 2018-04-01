#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Some advanced feature about OOP.
"""
from enum import Enum
from enum import unique


# First we need a class.
class Car(object):
    # We can use __slots__ to limit the attributes which can be bound.
    # Error will be raised when a attribute, which is not defined in __slots__, be added.
    __slots__ = ('__brand', 'speed', '__color')

    def __init__(self, brand, color):
        self.__brand = brand
        self.__color = color


# But superclass's __slots__ can't be inherited to subclasses
class ACar(Car):
    pass


# If subclass has defined the __slots__ then superclass's __slots__ will be inherited.
class BCar(Car):
    __slots__ = ()


# @property Setter/Getter
class Pen(object):
    def __init__(self):
        self.__color = ''
        self.__type = ''

    @property
    def color(self):
        return self.__color

    @color.setter
    def color(self, value):
        self.__color = value

    @property
    def type(self):
        return self.__type

    @type.setter
    def type(self, value):
        self.__type = value


class RunnableMixIn(object):
    @staticmethod
    def run():
        print('Running...')


class Animal(object):
    pass


class Cat(Animal, RunnableMixIn):
    def __str__(self):
        return 'Cat is cute!'

    __repr__ = __str__


@unique
class Weekday(Enum):
    Sun = 0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6


if __name__ == '__main__':
    car = Car('W', 'black')

    # A AttributeError will be raised
    # car.attribute = 'value'
    print('\033[1;31m---------------------TEST_PART_1--------------------\033[0m')
    a_car = ACar('NN', 'pink')
    a_car.attribute = 'value'
    print('Instance of ACar can add new attribute :', a_car.attribute)
    b_car = BCar('SS', 'red')
    b_car.speed = '50'

    print('\033[1;31m---------------------TEST_PART_2--------------------\033[0m')
    pen = Pen()
    pen.color = 'red'
    pen.type = 'pencil'
    print('@property setter and getter :', '(pen.color)', pen.color)

    print('\033[1;31m---------------------TEST_PART_3--------------------\033[0m')
    cat = Cat()
    cat.run()
    print(cat)

    print('\033[1;31m---------------------TEST_PART_4--------------------\033[0m')
    print('Some memo :')
    print('1. __iter__ make class can be iterated.')
    print('2. __next__ in for loop each time be called to iterate.')
    print('3. __getitem__ make class list-like. Get attribute like f[0].')
    print('4. __getattr__ if a attribute is not found in the class then __getattr__ will be called.')
    print('5. __call__ make class callable.')

    print('\033[1;31m---------------------TEST_PART_5--------------------\033[0m')
    print('About enum type.')
    print(Weekday.Sat, Weekday['Sat'], Weekday(6))
