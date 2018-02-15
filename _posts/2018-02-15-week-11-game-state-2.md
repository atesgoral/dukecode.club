---
title: "Game State 2"
week: 11
---

Here's where we've left off: <https://jsfiddle.net/atesgoral/x75ut61o/256/>
{: .panel .snapshot }

We're going to add the `'LOSS'` state. The game will transition to this state when it's in the `'PLAY'` state and the ball touches the bottom edge.

So far, we've been bouncing the ball off whenever it hit something at the bottom, whether it's the paddle or the bottom edge. We need to distinguish between a paddle hit and an edge hit. Let's start by introducing a new variable to tell us whether the ball is above the paddle. Where we adjust the `bottomEdge` variable to point to the top edge of the paddle, let's set `isAbovePaddle` to `true`. The value of this new variable will tell us whether the ball is above the paddle (true) or not (false):

```js
    var bottomEdge = c.height - BALL_RADIUS;
    var isAbovePaddle = false;

    if (ballX >= paddleX && ballX < paddleX + PADDLE_WIDTH) {
      bottomEdge = paddleY - BALL_RADIUS;
      isAbovePaddle = true;
    }
```

And now, when the ball's y coordinate is on or beyond `bottomEdge`, and the ball was above the paddle, we can set the game state to `'LOSS'`. Where we have the `if (ballY >= bottomEdge)` check, change the block to read like this:

```js
    	if (isAbovePaddle) {
        ballVelY = -ballVelY;
        ballY = bottomEdge * 2 - ballY;
      } else {
				state = 'LOSS';
      }
```

So, when we hit something at the bottom, and the ball was above the paddle, it's a paddle hit and we just bounce the ball off as usual. But if the ball wasn't above the paddle, it's a bottom edge hit and put the game into the `'LOSS'` state. The ball should stop moving when the game is in the `'LOSS'` state since we are only moving it around if the game is in the `'PLAY'` state.

Here's a snapshot of where we are: <https://jsfiddle.net/atesgoral/x75ut61o/260/>
{: .panel .snapshot }

*Note: This is still a bit of a contrived way to do collision detection with the paddle and so the code may not look intuitive. We'll clean things up when we start doing proper collision detection between the ball and rectangular objects on the screen.*

Another thing we can do is to stop drawing the paddle in the `'LOSS'` state, to prevent the ball from being drawn over the paddle and also to give better feedback to the player that they've screwed up and now have to wait to recover! :)

Where we draw the paddle, let's add the following conditional to not draw the paddle in the `'LOSS'` state:

```js
  if (state !== 'LOSS') {
    ctx.fillStyle = 'orange';
    ctx.fillRect(
      paddleX,
      paddleY,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );
  }
```

Here's where we've gotten: <https://jsfiddle.net/atesgoral/x75ut61o/261/>
{: .panel .snapshot }
