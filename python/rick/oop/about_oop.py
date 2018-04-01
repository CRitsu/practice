#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
About Object Oriented Programing in python.
"""


class Student(object):
    # Method start and end with '__' is special.
    # '__init__' is a method like constructor in Java.
    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def print_score(self):
        print('%s\'s score is %s' % (self.__name, self.__score))

    def get_grade(self):
        if self.__score > 90:
            print('A')
        elif self.__score > 60:
            print('B')
        else:
            print('C')

    def get_name(self):
        return self.__name


# Super class
class Animal(object):
    # Variable of class
    count = 0

    def __init__(self):
        Animal.count += 1

    def run(self):
        print('Animal is running...')

    def fly(self):
        print('Animal can\'t flying.')


# Subclass of Animal
class Dog(Animal):
    def run(self):
        print('Dog is running...')

    def __len__(self):
        return 50


# Subclass of Animal
class Bird(Animal):
    def fly(self):
        print('Bird is flying...')


if __name__ == '__main__':
    print('\033[1;31m---------------------TEST_PART_1--------------------\033[0m')
    std = Student('Bob', 100)
    std.print_score()
    std.get_grade()
    print('isinstance(std, Student) :', isinstance(std, Student))
    print('std.name :', std.get_name())

    print('\033[1;31m---------------------TEST_PART_2--------------------\033[0m')
    dog = Dog()
    dog.run()
    dog.fly()
    bird = Bird()
    bird.run()
    bird.fly()

    print('\033[1;31m---------------------TEST_PART_3--------------------\033[0m')
    print(type(std))
    print(type(dog))
    print(type(bird))
    print('isinstance(dog, Animal) :', isinstance(dog, Animal))
    print('isinstance(dog, Bird) :', isinstance(dog, Bird))
    print('isinstance(bird, Bird) :', isinstance(bird, Bird))
    bird2 = Bird()
    print('Animal.count :', Animal.count)

    print('\033[1;31m---------------------TEST_PART_4--------------------\033[0m')
    print(dir(std))
    print('len(dog) :', len(dog))
    print('hasattr(dog, \'fly\') :', hasattr(dog, 'fly'))
    print('hasattr(std, \'__name\') :', hasattr(std, '__name'))
