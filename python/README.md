## Python study memo

Begin to study python and write some sample to make sure whether I had got the point.

Maybe this repo is nonsense for you, it's just some words by a beginner.

That's all.

And I'm Rick.

> English is not my native language but I'm learning it by write this memo.


### First crawler

2018-01-28

I have completed my first crawler.

It's a crawler crawls a movies rank site, I had crawls Top 250 of movies and stored it into MySQL.

[Here is it!](./crawler/crawler_douban/crawler_douban.py)




### Python practice : make a blog site

2018-01-25

[16 days to make a blog site by python (include article show page & comment component & management page)](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001432170876125c96f6cc10717484baea0c6da9bee2be4000)

[Source code](https://github.com/michaelliao/awesome-python3-webapp)

It's a great tutorial about web in python.

I'll try to make a blog site follow it. But isn't now.

I'm interested in **CRAWLER** now. I want create a crawler to get some information to rich my database.

So, try the tutorial latter. Just mark it now.



### Learning python online

2018-01-23

I'm learning python at this site.

[Python](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)

It's a Chinese site.

> About [Distributed Process](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431929340191970154d52b9d484b88a7b343708fcc60000), I'll look back again. It's a little complex. So now let's just simply pass it.



### Print with color 

2018-01-22

```python
print('\033[1;31mMessage\033[0m')
```

The code above will print like this:

<font color='red'>Message</font>

> I thought it would be red but it seem does not work in markdown.  
> `<font color='red'>Message</font>`

`\033['style';'color';'background'm`

Start with `\033[`, and `'style'` is:

1. `0` default.
2. `1` highlight.
3. `4` underline.
4. `5` blink.(闪烁) 
5. `7` inverse.(反白)
6. `8` invisible.

The `'color'` and `'background'` is:

|`'color'`  | `'background'`    | style |
|:---------:|:-----------------:|:-----:|
|`30`       | `40`              | black |
|`31`       | `41`              | red   |
|`32`       | `42`              | green |
|`33`       | `43`              | yellow|
|`34`       | `44`              | blue  |
|`35`       | `45`              | pink  |
|`36`       | `46`              | cyan  |
|`37`       | `47`              | white |

And end with `m`.

Like the example above, `\033[1;31m` means print in red and with highlight for the word `Message`, and `\033[0m` means return to the default way to display words after it.  

Just run the script, it will show you the display.

[print_with_color.py](/rick/print_with_color.py)

The result is, in some situations, it's doesnt work.

