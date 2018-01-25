---
title: "Paddle"
week: 9
---

This week we'll add a rectangular paddle that we can move around with the mouse and the ball will bounce off from it.

Here's where we've left off: <https://jsfiddle.net/x75ut61o/228/>
{: .panel .snapshot }


First, let's introduce some new variables to define the size of our paddle. Add these lines right below where we define `BALL_RADIUS`:

```js
var PADDLE_WIDTH = 100;
var PADDLE_HEIGHT = 15;
```

We'll move the paddle along the bottom edge of the screen, with the mouse cursor tracking the middle of the paddle. The X coordinate of the paddle will be `PADDLE_WIDTH / 2` pixels to the left of the X coordinate of the mouse. The Y coordinate of the paddle will be `PADDLE_HEIGHT` pixels to the top of the bottom of the screen (canvas). After drawing the ball, let's define the `paddleX` and `paddleY` variables. Add these line below the `drawCircle` call inside our `paint` function:

```js
  var paddleX = mouseX - PADDLE_WIDTH / 2;
  var paddleY = c.height - PADDLE_HEIGHT;
```

And to draw the paddle, let's draw an orange rectangle:

```js
  ctx.fillStyle = 'orange';
  ctx.fillRect(
    paddleX,
    paddleY,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
```

If you try this, you'll see that the paddle goes off the screen when you're too close to the edges. This is because the mouse is free to move all the way from the very most edge of the screen to the very left. But we don't want our paddle to go off the screen. We'll have to add some checks to ensure this. Add the following lines before the drawing of the paddle:

```js
  if (paddleX < 0) {
    paddleX = 0;
  } else if (paddleX > c.width - PADDLE_WIDTH) {
    paddleX = c.width - PADDLE_WIDTH;
  }
```

Now we have a paddle that follows the mouse and doesn't go off the screen!

We'll now have to add collision detection to make the ball bounce off the top of the paddle. So far we've been bouncing the wall only off the edges of the screen. The only bottom edge we had to worry about was the bottom edge of the screen. We now want to also worry about a new edge: the top of the paddle. We basically need to know when we need to check for a collision with the top of the paddle as opposed to a collision with the bottom edge of the screen.

First, let's make a small tweak to the existing code. Add the following line right before our existing edge collision check code:

```js
  var bottomEdge = c.height - BALL_RADIUS;
```

 And also change the bottom edge collision check to use this new variable:

```js
  if (ballY >= bottomEdge) { // here
  	ballVelY = -ballVelY;
    ballY = bottomEdge * 2 - ballY; // and here
  } else if (ballY < BALL_RADIUS) {
  	ballVelY = -ballVelY;
    ballY = BALL_RADIUS * 2 - ballY;
  }
```

So far nothing new should happen because we didn't account for the paddle yet. Let's do that now. Right after defining the `bottomEdge` variable, do this check:

```js
  if (ballX >= paddleX && ballX < paddleX + PADDLE_WIDTH) {
    bottomEdge = paddleY - BALL_RADIUS;
  }
```

What we're saying with this is:

> If the ball's X coordinate is greater than or equal to the left edge of the paddle, and at the same time (`&&`), less than the right edge of the paddle, then use the paddle's top edge as the farthest the ball can travel to.

In other words, if the ball is between the left and right edges of the paddle, the ball may hit the paddle instead of hitting the bottom edge.

As a final tweak, let's remove the trails the ball and the paddle leave behind. We had added that in earlier to see the path the ball was taking better. Remove the lines where we change the `globalAlpha` of the canvas context (`ctx`):

```js
  ctx.fillStyle = 'black';
  ctx.globalAlpha = 0.1; // remove this!
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.globalAlpha = 1; // remove this!
```

Now we have a paddle and ball, but it's not a real game until we start adding some state to the game like the start of the game, losing a ball, restarting. We'll start tackling this next week!

<div markdown="1">
References for the curious mind:

* [Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
</div>
{: .panel .references }

Here's where we've gotten: <https://jsfiddle.net/x75ut61o/235/>
{: .panel .snapshot }
