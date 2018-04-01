#!/usr/bin/env python3
# -*- encoding: UTF-8 -*-
"""
Print message with color.
Run the script, it will show you the display of each color and style.
"""


def run():
    print('---------------------THE COLOR--------------------')
    print('BLACK : \033[0;30mBlack message.\033[0m (Seem don\'t work at some situation.)')
    print('RED   : \033[0;31mRed message.\033[0m')
    print('GREEN : \033[0;32mGreen message.\033[0m')
    print('YELLOW: \033[0;33mYellow message.\033[0m (Maybe it\'s brown??)')
    print('BLUE  : \033[0;34mBlue message.\033[0m')
    print('PINK  : \033[0;35mPink message.\033[0m')
    print('CYAN  : \033[0;36mCyan message.\033[0m')
    print('WHITE : \033[0;37mWhite message.\033[0m')
    print('-------------------THE BACKGROUND-----------------')
    print('BLACK : \033[0;30;40mBlack background.\033[0m (Seem don\'t work at some situation.)')
    print('RED   : \033[0;30;41mRed background.\033[0m')
    print('GREEN : \033[0;30;42mGreen background.\033[0m')
    print('YELLOW: \033[0;30;43mYellow background.\033[0m (Maybe it\'s brown??)')
    print('BLUE  : \033[0;30;44mBlue background.\033[0m')
    print('PINK  : \033[0;30;45mPink background.\033[0m')
    print('CYAN  : \033[0;30;46mCyan background.\033[0m')
    print('WHITE : \033[0;30;47mWhite background.\033[0m')
    print('---------------------THE STYLE--------------------')
    print('DEFAULT  : \033[0;31mDefault red message.\033[0m')
    print('HIGHLIGHT: \033[1;31mHighlight red message.\033[0m')
    print('UNDERLINE: \033[4;31mUnderline red message.\033[0m')
    print('BLINK    : \033[5;31mBlink red message.\033[0m')
    print('INVERSE  : \033[7;31mInverse red message.\033[0m')
    print('INVISIBLE: \033[8;31mInvisible red message.\033[0m')


if __name__ == '__main__':
    run()
