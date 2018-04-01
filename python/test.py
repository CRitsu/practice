def hello_world():
    '''Hello world.

    :return: 'hello'
    '''
    return 'hello'


print(hello_world())

if __name__ == '__main__':
    import logging
    import pdb

    logging.basicConfig(level=logging.INFO)
    c = 0
    pdb.set_trace()
    logging.info('Now c is 0 !')
    assert c == 1, 'What do you mean?'
