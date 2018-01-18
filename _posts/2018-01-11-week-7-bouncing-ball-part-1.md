---
title: "Bouncing Ball - Part 1"
week: 7
---

This week we'll start working on getting a ball bounce around the screen, using some simply physics (position, velocity.)

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

Now, we want the ball to have a velocity and start moving around by itself. Define two new variables for the x and y components of the velocity:

```js
var ballVelX = 2;
var ballVelY = 1;
```

In each frame, we will add the ball's velocity to its position to move it. Inside the `paint()` function (note: this it not necessarily the best place to put this, but it will do for now) add these lines right after drawing the ball:

```js
  ballX += ballVelX;
  ballY += ballVelY;
```

You should now see the ball start slowly moving towards the bottom right, 2 pixels to the right and 1 pixel to the bottom each frame (60 times a second.)

Here's where we've gotten: <https://jsfiddle.net/x75ut61o/219/>
{: .panel .snapshot }
