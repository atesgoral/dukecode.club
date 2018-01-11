---
title: "Bouncing Ball"
week: 7
---

This week we'll make a ball bounce around the screen, using some simply physics (position, velocity.)

Let's start with this setup: <https://jsfiddle.net/x75ut61o/218/>
{: .panel .snapshot }

The first change we'll make is to stop moving the ball based on where the mouse is. We'll define two new variables, `ballX` and `ballY` to track the position of the ball. Let's put the ball in the middle of the canvas. Add these lines where we define mouse-related variables (e.g. `mouseX`.)

```js
var ballX = c.width / 2;
var ballY = c.height / 2;
```

And in the `paint()` function, change the line where we draw the ball to use these coordinates instead of the mouse coordinates:

```js
function paint(t) {
	requestAnimationFrame(paint);

  ctx.fillStyle = 'black';
  ctx.globalAlpha = 0.1;
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.globalAlpha = 1;

  drawCircle(ballX, ballY, 10, 'white');
}
```
