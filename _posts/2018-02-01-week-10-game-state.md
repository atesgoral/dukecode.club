---
title: "Game State"
week: 10
---

This week we'll add different states to the game to make it feel more like a game that has a start and an end.

Here's where we've left off: <https://jsfiddle.net/atesgoral/x75ut61o/240/>
{: .panel .snapshot }

We'll figure out what different states the game will have and then start writing some code for it during today's session!

First, let's use an example from nature to introduce the idea of states and state transition. Let's use water as an example. The different **states** water can be in are:

1. Solid (ice)
2. Liquid (water)
3. Gas (steam)

And here are the possible **state transitions** that we typically observe:

1. Solid → Liquid: Ice melts and turns into water through the applicaiton of heat
2. Liquid → Solid: Water freezes and turns into ice through the loss of heat
3. Liquid → Gas: Water evaporates and turns into steam through the application of heat
4. Gas → Liquid: Steam condenses and turns into water through the loss of heat

Now let's start thinking about what different states our game can be in. There's definitely a "play" state which is when the actual game play happens. It's when the ball is still on the screen, bouncing off the edges and our paddle. But the moment we miss hitting the ball with the paddle, we lose the ball: we can call define a "loss" state for this where game plays stop and we show some kind of visual effect to indicate the loss of a ball. Also, after the ball is lost but before the game goes into the "play" state again, we can have an intermediate state where the ball just rests on the paddle, waiting for us to launch it. Let's call this the "resting" state and also make it the state the game starts in. We're going to implemenet a simple **state machine** to keep track of the game state. First, a recap of all the states our game can currently be in:

1. Resting: The ball rests on the paddle and moves left and right with it
2. Play: The actual game play where the ball bounces around without falling off the bottom edge
3. Loss: The ball has fallen off the bottom edge!

And the state transitions are:

1. Resting → Play: The player clicks the mouse button to launch the ball from the paddle
2. Play → Loss: The ball falls off the bottom edge
3. Loss → Resting: After some time passes, we're back to the beginning.

First, let's make the ball rest on the paddle. Let's initialize the ball-related variables all to 0 to stop the ball from moving around. Find the place where these variables are initialized and set all of them to 0:

```js
var ballX = 0;
var ballY = 0;
var ballVelX = 0;
var ballVelY = 0;
```

Now let's think about what it will take to rest the ball on top of the paddle, right in the middle. If we know the top left corner of the paddle is at coordinates `paddleX` and `paddleY`, we can calculate where the ball's center is going to be.

Let's start off with placing the ball's centre where the top left corner of the paddle is:

<script type="text/diagram">
ctx.globalAlpha = .666;

rectangle(-.5, 0, 1, .2, 'darkgray');
circle(-.5, 0, .125, 'white');

ctx.globalAlpha = .75;

circle(-.5, 0, .0125, 'white');
</script>

We first have to move the ball to the right to bring it to the middle of the paddle:

<script type="text/diagram">
ctx.globalAlpha = .666;

rectangle(-.5, 0, 1, .2, 'darkgray');
circle(0, 0, .125, 'white');

ctx.globalAlpha = .75;

circle(-.5, 0, .0125, 'white');
circle(0, 0, .0125, 'white');

ctx.globalAlpha = 1;

arrow(-.5, 0, 0, 0, 'cyan');
</script>

And that distance is half of the paddle, which we know to be `PADDLE_WIDTH`. So, the amount we have to move the ball to the right is `PADDLE_WIDTH / 2`. We then have to move the ball up a bit to rest it on the paddle:

<script type="text/diagram">
ctx.globalAlpha = .666;

rectangle(-.5, 0, 1, .2, 'darkgray');
circle(0, -.125, .125, 'white');

ctx.globalAlpha = .75;

circle(-.5, 0, .0125, 'white');
circle(0, -.125, .0125, 'white');

ctx.globalAlpha = 1;

arrow(-.5, 0, 0, 0, 'cyan');
arrow(0, 0, 0, -.125, 'lime');
</script>

And that final move amount is the radius of the ball, which we know to be `BALL_RADIUS`.

So, let's draw the ball on top of the paddle. Add the following lines right after we draw the paddle:

```js
  ballX = paddleX + PADDLE_WIDTH / 2;
  ballY = paddleY - BALL_RADIUS;
```

You should now see the ball move around with the paddle.

Here's a snapshot of where we are: <https://jsfiddle.net/atesgoral/x75ut61o/242/>
{: .panel .snapshot }

Let's now start adding some code to add state into our game. Introduce a new variable, `state` and set it initialy to the string `'RESTING'`. Note that we'll use the convention of all-uppercase strings to represent states. Add the following line right after where we initialize the `ballVelY` variable:

```js
var state = 'RESTING';
```

Now, we want to move the ball with the paddle only in the `'RESTING'` state and apply velocity to the ball only in the `'PLAY'` state. Let's add an `if..else` block to make sure we're moving the ball based on the state. Modify the code to read like this (hint: you can select a bunch of existing lines and hit the <kbd>TAB</kbd> key to indent them all):

```js
  if (state == 'RESTING') {
    ballX = paddleX + PADDLE_WIDTH / 2;
    ballY = paddleY - BALL_RADIUS;
  } else if (state == 'PLAY') {
    ballX += ballVelX;
    ballY += ballVelY;

    if (ballX >= c.width - BALL_RADIUS) {
      ballVelX = -ballVelX;
      ballX = (c.width - BALL_RADIUS) * 2 - ballX;
    } else if (ballX < BALL_RADIUS) {
      ballVelX = -ballVelX;
      ballX = BALL_RADIUS * 2 - ballX;
    }

    var bottomEdge = c.height - BALL_RADIUS;

    if (ballX >= paddleX && ballX < paddleX + PADDLE_WIDTH) {
      bottomEdge = paddleY - BALL_RADIUS;
    }

    if (ballY >= bottomEdge) {
      ballVelY = -ballVelY;
      ballY = bottomEdge * 2 - ballY;
    } else if (ballY < BALL_RADIUS) {
      ballVelY = -ballVelY;
      ballY = BALL_RADIUS * 2 - ballY;
    }
  }
```

Here's a snapshot: <https://jsfiddle.net/atesgoral/x75ut61o/244/>
{: .panel .snapshot }

Finally, we want to launch the ball and put the game into the `'PLAY'` state when the user hold down and then releases the mouse button. Add the following lines into the `handleMouseUp` function:

```js
  ballVelY = -1;
  ballVelX = 1;
  state = 'PLAY';
```

What we're doing here is, first lauching the ball into the air by giving it an initial velocity and then settting the game state to `'PLAY'`.

Next week, we'll add the `'LOSS'` state.

Here's where we've gotten: <https://jsfiddle.net/atesgoral/x75ut61o/245/>
{: .panel .snapshot }
