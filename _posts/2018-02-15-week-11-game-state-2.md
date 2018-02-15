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

Here's a snapshot of where we are: <https://jsfiddle.net/atesgoral/x75ut61o/261/>
{: .panel .snapshot }

Next, let's wait for about 3 seconds before putting the game back into the `'RESTING'` state. For this, we can count the number of frames we're rendering. Since we're rendering at most 60 frames per second, we know that it will take 60 x 3 frames to wait 3 seconds. Let's start by defining a new variable:

```js
var LOSS_DURATION = 3;
```

(Put this where we define all the game-wide tweaking parameters.)

Now, in order to count the number of frames we've spent in the `'LOSS'` state, we can define a new variable to count the number of frames we're rendering. Define a new game variable (put this below where we define the `state` variable):

```js
var frameCount = 0;
```

And let's increment this variable each frame. Add this line at the beginning of the `paint()` function:

```js
  frameCount = frameCount + 1;
```

Now, we're counting frames.

But to know the number of frames we've rendered since an given an event in the game, we should reset this counter back to 0 when that event occurs. Where we set the game state to `'LOSS'`, reset `frameCount` to 0:

```js
      if (isAbovePaddle) {
        ballVelY = -ballVelY;
        ballY = bottomEdge * 2 - ballY;
      } else {
        state = 'LOSS';
        frameCount = 0;
      }
```

And finally, we need to add a check to see if the frameCount has reached `LOSS_DURATION`. In other words, whether we've rendered 3 seconds worth of frames.

Add the following right after incrementing `frameCount`:

```js
  if (state === 'LOSS' && frameCount === LOSS_DURATION * 60) {
  	state = 'RESTING';
  }
```

This is saying: If we're in the `'LOSS'` state and if we've rendered `LOSS_DURATION` (the number of seconds to wait) x 60 (the number of frames we render per second), then put the game back into the `'RESTING'` state.

Here's where we've gotten: <https://jsfiddle.net/atesgoral/x75ut61o/270/>
{: .panel .snapshot }
