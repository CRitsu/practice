#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""Test for add text to an image"""
import os, re

from PIL import Image, ImageFont, ImageDraw


def add_text_to_image(file_name, out_dir):
    # open image file
    img = Image.open(file_name)
    # get size
    size = img.size
    # get extend size
    extend = size[1] * 0.1
    # font size
    font_size = round(extend / 2.1)
    # extend image region
    box = (0, 0, size[0], size[1] + extend)
    # extend image
    n = img.crop(box)

    # color black
    black = (0, 0, 0)
    # color white
    white = (255, 255, 255)

    # create draw object
    draw = ImageDraw.Draw(n)
    # fill white to extended region
    draw.rectangle([(0, size[1]), (size[0], size[1] + extend)], white)

    # get text from file name
    text = str(file_name).split('.')[0]
    # calculate text start position
    # x = (width - length of text) / 2
    coo_x = (size[0] - len(text) * font_size) / 2
    # if length of text > width then change the font size
    if coo_x < 0:
        font_size = round(size[0] / len(text))
        coo_x = 0
    # set font and size
    font = ImageFont.truetype('./Arial Unicode.ttf', font_size)
    coo = (coo_x, size[1])

    # draw text
    draw.text(coo, text, black, font)

    # check output dir
    if not os.path.exists(out_dir):
        os.mkdir(out_dir)
    # get output file name
    o_file = out_dir + os.sep + str(file_name)
    # save image file
    n.save(o_file)


if __name__ == '__main__':

    # wait for input
    dir_name = input(u'请输入目标文件夹完整路径并按回车确认\n>')

    # check if it is a dir
    if os.path.isdir(dir_name):
        # get all files list
        files = os.listdir(dir_name)
        # filter image files
        reg = re.compile('\.jpg|\.png|\.jpeg|\.gif')
        files = filter(lambda x: bool(reg.search(x)), files)
        # output dir name
        o_dir = dir_name + os.sep + 'out'
        # loop images
        for im in files:
            add_text_to_image(im, o_dir)
        print(u'操作完成\n输出目录：{}\n'.format(o_dir))
    else:
        print(u'检测目标非目录，请重启程序重试\n')
