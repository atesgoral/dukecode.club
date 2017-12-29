---
title: "Colours"
week: 2
---

Here's where we've left off: <https://jsfiddle.net/x75ut61o/>
{: .panel .snapshot}

We'll experiment with drawing different rectangles in different colours!

The `fillStyle` property of the context object lets you change the fill color *before* filling a rectangle. It's like picking up a different crayon before painting a new rectangle.

Copy and paste (or manually type from scratch) the `fillRect` line from last week to draw as many different rectangles at different positions and dimensions as you like. Set `fillStyle` to change the fill colour!

```js
var ctx = c.getContext('2d');

ctx.fillRect(0, 0, 10, 10);

ctx.fillStyle = 'red';
ctx.fillRect(20, 0, 10, 10);

ctx.fillStyle = 'blue';
ctx.fillRect(0, 20, 30, 10);
```

<div markdown="1">
Feel free to experiment:

* Use different colour values. Can you guess some colour names?
* Where can you find all the colour names you can use?
* Add more shapes with different colours to draw something.
</div>
{: .panel .experiments }

<div markdown="1">
References for the curious mind:

* [`fillStyle`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
* [Valid color values](https://developer.mozilla.org/en-US/docs/Web/CSS/color)
* [Web colors](https://en.wikipedia.org/wiki/Web_colors)
</div>
{: .panel .references }
