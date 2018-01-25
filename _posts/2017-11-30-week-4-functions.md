---
title: "Functions"
week: 4
---

Here's where we've left off: <https://jsfiddle.net/x75ut61o/112/>
{: .panel .snapshot }

We'll learn how to write our own functions.

One of the uses of functions is to allow us to group a set of operations (or a single, complex operation) so that the entire group of actions can be performed with just a single call to a function.

Take as an example how we draw a square: `ctx.fillRect(x, y, width, height)`. We could create a function to draw a square at a given (x, y) coordinate and size:

```js
function drawSquare(x, y, size) {
  ctx.fillRect(x, y, size, size);
}
```

This both reduced the number of arguments we have to use each time we have to draw a square (as opposed to repeating the same size for both the width and the height) and also communicates our intent better (i.e. "draw a square").

Change the entire code to look like this:

```js
var ctx = c.getContext('2d')

function drawSquare(x, y, size) {
  ctx.fillRect(x, y, size, size);
}

for (var i = 0; i < 10; i++) {
  drawSquare(i * 10, i * 10, 10);
}
```

Functions will start getting more meaningful when we start doing more than just a single operation. Now, let's also specify the colour of the square by adding a color argument:

```js
function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}
```

You can now call this function to draw a square with any colour: `drawSquare(10, 10, 20, 'red')`.

Now, let's define a new function that allows us to define any colour we want, using hue, saturation and lightness (or luminosity)!

```js
function hsl(hue, saturation, lightness) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
```

Now, change the entire code to look like this:

```js
var ctx = c.getContext('2d');

function drawSquare(x, y, size, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

function hsl(hue, saturation, lightness) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

for (var i = 0; i < 10; i++) {
  drawSquare(i * 10, i * 10, 10, hsl(i * 36, 100, 50));
}
```

<div markdown="1">
Feel free to experiment:

* Use different staturation and lightness values.
* Make saturation and lightness dependent on `i` as well.
* Hue is an angle between 0-360. What happens when you beyond 360? Can you guess?
</div>
{: .panel .experiments }

<div markdown="1">
References for the curious mind:

* [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
* [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
</div>
{: .panel .references }
