#!/usr/bin/env python3
# -*- encoding: utf-8 -*-
"""
First pygal test.
"""
import pygal
import functools
import inspect
import os
from random import randint
from pygal.style import BlueStyle


global_base_path = '../../out/'  # temporary directory
size = 10


def get_random_data(s=10):
    """Random data generator."""
    result = []
    for i in range(s):
        result.append(randint(10, 200))
    return result


def get_increment_data(s=10):
    """For line chart."""
    result = [0]
    for i in range(s):
        result.append(result[i] + randint(0, 10))
    return result


def get_percent_data(s=3):
    """For pie chart."""
    s = s if s >= 3 else 3
    result = [randint(1, 80)]
    for i in range(s - 1):
        result.append(randint(0, 100 - functools.reduce(lambda x, y: x + y, result)))
    return result


def check_exists(func):
    """If file exists then do not execute the function."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        file_name = get_file_name(func.__name__)
        if not os.path.isfile(file_name):
            tem = func(*args, **kwargs)
            print('File created: [{}]'.format(file_name))
            return tem
        print('File exists: [{}]'.format(file_name))

    return wrapper


def get_file_name(name):
    return '{}{}.svg'.format(global_base_path, name)


@check_exists
def generate_chart():
    chart = pygal.Bar()
    chart.title = 'TEST_BAR'
    chart.x_labels = map(str, range(size))
    chart.add('TEST', get_random_data(size))
    chart.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def multi_series_chart():
    chart = pygal.Bar()
    chart.title = 'multi_series_bar'
    chart.x_labels = map(str, range(size))
    chart.add('Number 1 Test one', get_random_data(size))
    chart.add('Number 2 Test two', get_random_data(size))
    chart.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def stacked_bar():
    chart = pygal.StackedBar()
    chart.title = 'starked_bar'
    chart.x_labels = map(str, range(size))
    chart.add('Number 1 Test one', get_random_data(size))
    chart.add('Number 2 Test two', get_random_data(size))
    chart.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def horizontal_stacked_bar():
    chart = pygal.HorizontalStackedBar()
    chart.title = 'horizontal_stacked_bar'
    chart.x_labels = map(str, range(size))
    chart.add('Number 1 Test one', get_random_data(size))
    chart.add('Number 2 Test two', get_random_data(size))
    chart.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def line_chart():
    line = pygal.Line()
    line.title = 'LINE CHART TEST'
    line.x_labels = map(str, range(size))
    line.add('One', get_increment_data(size))
    line.add('Two', get_increment_data(size))
    line.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def horizontal_line_chart():
    line = pygal.HorizontalLine()
    line.title = 'HORIZONTAL LINE CHART TEST'
    line.x_labels = map(str, range(size))
    line.add('One', get_increment_data(size))
    line.add('Two', get_increment_data(size))
    line.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def stacked_line_chart():
    line = pygal.StackedLine(fill=True)
    line.title = 'STACKED LINE CHART TEST'
    line.x_labels = map(str, range(size))
    data = get_increment_data(size)
    other = [100 - x for x in data]
    line.add('main', data)
    line.add('other', other)
    line.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def pie_chart():
    pie = pygal.Pie()
    pie.title = 'PIE CHART TEST'
    data = get_percent_data(5)
    for i, v in enumerate(data):
        pie.add('No.{}'.format(i + 1), v)
    pie.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def half_pie_chart():
    pie = pygal.Pie(half_pie=True)
    pie.title = 'HALF PIE CHART TEST'
    data = get_percent_data(5)
    for i, v in enumerate(data):
        pie.add('No.{}'.format(i + 1), v)
    pie.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def radar_chart():
    """Need set number of axis, and each data should has same number of values."""
    line = 6
    radar = pygal.Radar()
    radar.title = 'RADAR CHART TEST'
    radar.x_labels = ['TAR {}'.format(x) for x in range(line)]
    for i in range(3):
        radar.add('Item {}'.format(i), get_random_data(line))
    radar.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def box_chart():
    box = pygal.Box()
    box.title = 'BOX CHART TEST'
    for i in range(5):
        box.add('Item {}'.format(i), get_random_data(size))
    box.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def dot_chart():
    dot = pygal.Dot(x_label_rotation=30)
    dot.title = 'DOT CHART TEST'
    dot.x_labels = ['DOT TARGET {}'.format(x) for x in range(10)]
    for i in range(3):
        dot.add('Item {}'.format(i), get_random_data(size))
    dot.add('Neg exists', [x - 100 for x in get_random_data(size)])
    dot.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def solid_gauge_chart():
    solid = pygal.SolidGauge(inner_radius=0.70)
    solid.title = 'SOLID GAUGE CHART TEST'
    result = get_random_data(7)
    for i, v in enumerate(result):
        solid.add('Item {}'.format(i + 1), [{'value': v, 'max_value': 200}], formatter=lambda x: '{}%'.format(x))
    solid.add("Special", [  # stacked value, sum of these values should not over the max value
        {'value': randint(1, 100), 'max_value': 200},
        {'value': randint(30, 100), 'max_value': 200},
    ], formatter=lambda x: '{}$'.format(x))
    solid.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def half_solid_gauge_chart():  # half pie version of above
    solid = pygal.SolidGauge(half_pie=True, inner_radius=0.70)
    solid.title = 'HALF SOLID GAUGE CHART TEST'
    result = get_random_data(7)
    for i, v in enumerate(result):
        solid.add('Item {}'.format(i + 1), [{'value': v, 'max_value': 200}], formatter=lambda x: '{}%'.format(x))
    solid.add("Special", [  # stacked value, sum of these values should not over the max value
        {'value': randint(1, 100), 'max_value': 200},
        {'value': randint(30, 100), 'max_value': 200},
    ], formatter=lambda x: '{}$'.format(x))
    solid.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def gauge_chart():
    gauge = pygal.Gauge(human_readable=True)
    gauge.title = 'GAUGE CHART TEST'
    gauge.range = [0, 200]
    data = get_random_data(5)
    for i in data:
        gauge.add('Tar {}'.format(i), i)
    gauge.render_to_file(get_file_name(inspect.stack()[0][3]))


@check_exists
def blue_style_chart():
    dot = pygal.Dot(x_label_rotation=30, style=BlueStyle)
    dot.title = 'DOT CHART TEST'
    dot.x_labels = ['DOT TARGET {}'.format(x) for x in range(10)]
    for i in range(3):
        dot.add('Item {}'.format(i), get_random_data(size))
    dot.add('Neg exists', [x - 100 for x in get_random_data(size)])
    dot.render_to_file(get_file_name(inspect.stack()[0][3]))


# Built-in Styles
    # Default
    # DarkStyle
    # Neon
    # Dark Solarized
    # Light Solarized
    # Light
    # Clean
    # Red Blue
    # Dark Colorized
    # Light Colorized
    # Turquoise
    # Light green
    # Dark green
    # Dark green blue
    # Blue
# http://www.pygal.org/en/stable/documentation/builtin_styles.html


if __name__ == '__main__':
    generate_chart()
    multi_series_chart()
    stacked_bar()
    horizontal_stacked_bar()
    line_chart()
    horizontal_line_chart()
    stacked_line_chart()
    pie_chart()
    half_pie_chart()
    radar_chart()
    box_chart()
    dot_chart()
    solid_gauge_chart()
    half_solid_gauge_chart()
    gauge_chart()
    blue_style_chart()
