---
title: "Bouncing Ball - Part 2"
week: 8
---

This week we'll make the ball bounce off the edges of the screen.

Here's where we've left off: <https://jsfiddle.net/x75ut61o/219/>
{: .panel .snapshot }

First, let's introduce a new variable, `BALL_RADIUS` to make the math we'll have to do. Add the variable and replace the `10` in our `drawCircle` call with this variable:

```js
var BALL_RADIUS = 10;
```

And:

```js
  drawCircle(ballX, ballY, BALL_RADIUS, 'white');
```

It's very common to use variables for values like these (the ball radius) so that we don't have to change multiple places in the code when we decide to tweak a value.

The next bit will be a bit more complicated. Add the following bit of code right after we change the ball position (find where we add the velocity to the position inside the `paint` function):

```js
  if (ballX >= c.width - BALL_RADIUS) {
    ballVelX = -ballVelX;
    ballX = (c.width - BALL_RADIUS) * 2 - ballX;
  }
```

This is telling the code to invert the velocity of the ball and also to adjust it's x position so that it doesn't go off the edge. I'll explain this a bit more later.

And to make the ball bounce off all edges, this is the full code that you'll have to add:

```js
  if (ballX >= c.width - BALL_RADIUS) {
    ballVelX = -ballVelX;
    ballX = (c.width - BALL_RADIUS) * 2 - ballX;
  } else if (ballX < BALL_RADIUS) {
    ballVelX = -ballVelX;
    ballX = BALL_RADIUS * 2 - ballX;
  }

  if (ballY >= c.height - BALL_RADIUS) {
    ballVelY = -ballVelY;
    ballY = (c.height - BALL_RADIUS) * 2 - ballY;
  } else if (ballY < BALL_RADIUS) {
    ballVelY = -ballVelY;
    ballY = BALL_RADIUS * 2 - ballY;
  }
```

I've simplified some of the expression and therefore the code looks hard to understand in some parts, but I'll explain the math behind it later. This is also not a perfectly correct bounce, but just a close approximation of it. Physically-accurate bouncing takes a lot more code to do!

Here's where we've gotten: <https://jsfiddle.net/x75ut61o/228/>
{: .panel .snapshot }


