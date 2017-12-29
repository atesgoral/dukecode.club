---
title: "Square"
week: 1
---

Let's learn how to draw a simple square (or rectangle) using HTML and JavaScript, from scratch!

Go to [JSFiddle](https://jsfiddle.net) and enter the following in the HTML panel:

```html
<canvas id="c"></canvas>
```

And in the JavaScript panel, enter the following:

```js
var ctx = c.getContext('2d');

ctx.fillRect(0, 0, 10, 10);
```

After hitting **Run** you should see a black square in the output panel.

We've created a canvas element, assigned it an id (identifier) of "c". The HTML we have is not a full-fledged, valid HTML, but it will do for now.

We automatically get a *global* variable (more on that later) called `c` in JavaScript, which refers to our canvas element. This is a lazy way of doing this quickly, and not a best practice, but it will do for now.

Then we get the 2D (two-dimensional) drawing context from the canvas element and store that in a new variable called `ctx`.

Then we call the `fillRect()` method on the context to draw a rectangle. The arguments to the method are: x coordinate, y coordinate, width, height. In our case, we're drawing the rectangle at the top left corner of the canvas. It's 10 pixels by pixels, which make it a square.

<div markdown="1">
Feel free to experiment:

* Use different values for x, y, width and height.
</div>
{: .panel .experiments }

<div markdown="1">
References for the curious mind:

* [`getContext()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)
* [`fillRect()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect)
</div>
{: .panel .references }
