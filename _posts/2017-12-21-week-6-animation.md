---
title: "Animation"
week: 6
---

Here's where we've left off: <https://jsfiddle.net/x75ut61o/154/>
{: .panel .snapshot }

There's going to be so much stuff this week! Put on your seatbelts.

So far we've been just drawing static images. Let's start doing some animation. We'll draw animation frames using the `requestAnimationFrame` method. This method tells the browser to call your frame drawing function when the browser is ready to draw, typically 60 frames per second.

First, some preparation. Instead of deleting code, you can "comment out" (or stash away) bits of your code. One way to do this in JavaScript is to add two forward slashes (`//`) to the left of the bits of code you want to comment out. Now go ahead and comment out the entire contents of our `handleMouseMove` function:

```js
function handleMouseMove(event) {
  //if (isMouseDown) {
    //drawSquare(event.clientX - 5, event.clientY - 5, 10, hsl(220, 100, 50));
  //}
}
```

So, we've stopped drawing a square immediately when the mouse moves. We'll store the mouse coordinates in two new variables and later use them in our animation. Add the following bits of code and also modify `handleMouseMove` to look like this:

```js
var mouseX = 0;
var mouseY = 0;

function handleMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  //if (isMouseDown) {
    //drawSquare(event.clientX - 5, event.clientY - 5, 10, hsl(220, 100, 50));
  //}
}
```

You can actually delete the commented-out bits of code. We'll never use them again. I just wanted to show you how you can comment out code.

Now, we're storing the latest known coordinates of the mouse in the `mouseX` and `mouseY` variables.

Let's add another utility function. We've drawing squares. Let's draw circles this week! Drawing a circle is actually a multi-step process and you'll appreciate hiding all those steps inside a single function. Add this:

```js
function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
```

Now, we'll create a paint function and start using it for animation rendering. This part might look a bit tricky:

```js
function paint(t) {
  requestAnimationFrame(paint);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, c.width, c.height);

  drawCircle(mouseX, mouseY, 10, 'white');
}

requestAnimationFrame(paint);
```

Every frame, our paint function fills the entire canvas in black (erases the frame) and then draws a white circle at the last known coordinates of the mouse.

Let's get a bit fancier. Here's a quick trick to make the white circle leave a trail behind. Instead of painting the canvas with a solid black, we'll fill it with a translucent black so that what's behind will show through and successive applications of the same translucent black will eventually turn older trails entirely black. This will make more sense when we see it in action. Change the `paint` function by adding the two `globalAlpha` lines to look like:

```js
function paint(t) {
  requestAnimationFrame(paint);

  ctx.globalAlpha = 0.1; // 10% opacity (very translucent!)
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.globalAlpha = 1; // change back to fully opaque

  drawCircle(mouseX, mouseY, 10, 'white');
}

requestAnimationFrame(paint);
```

How about incorporating the mouse button into the mix? And some colours? I'll skip to the end without explaining every step of the way:

```js
function paint(t) {
  requestAnimationFrame(paint);

  ctx.fillStyle = 'black';
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.globalAlpha = 1;

  if (isMouseDown) {
    drawCircle(mouseX, mouseY, 10, hsl(t % 360, 100, 50));
    drawCircle(c.width - mouseX, c.height - mouseY, 10, hsl(t % 360, 100, 50));
  } else {
    drawCircle(mouseX, mouseY, 10, 'white');
  }
}

requestAnimationFrame(paint);
```

I'll let you ponder about what's we've just added. But I'll explain what that `t` argument that our paint function receives is. It's the time since the animation started (the first call to `requestAnimationFrame`. It keeps increasing at each frame. We can use the value of `t` to do time-based things in our animation. In our case, we're cycling the hue of the circle based on time.

<div markdown="1">
Feel free to experiment:

* Can you add more circles, using different cominations of `mouseX`, `mouseY`, `c.width` and `c.height` to create a [kaleidoscope](https://en.wikipedia.org/wiki/Kaleidoscope)?

</div>
{: .panel .experiments }

<div markdown="1">
References for the curious mind:

* [`beginPath`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)
* [`arc`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)
* [`fill`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill)
* [`globalAlpha`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha)
* [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
</div>
{: .panel .references }

Here's where we've gotten: <https://jsfiddle.net/x75ut61o/155/>
{: .panel .snapshot }
