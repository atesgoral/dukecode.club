---
title: "Game State 3"
week: 12
---

Here's where we've left off: <https://jsfiddle.net/atesgoral/x75ut61o/261/>
{: .panel .snapshot }

Last time around, we implemented the `'LOSS'` state, but the game would just get stuck in that state forever. We need to make the game transition back to the `'RESTING'` state to let the player keep on playing additional rounds (or lives.)

Let's wait for about 3 seconds before putting the game back into the `'RESTING'` state. For this, we can count the number of frames we're rendering. Since we're rendering at most 60 frames per second, we know that it will take 60 x 3 frames to wait 3 seconds. Let's start by defining a new variable:

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

Here's a snapshot of where we are: <https://jsfiddle.net/atesgoral/x75ut61o/366/>
{: .panel .snapshot }

As a final touch, let's add a simple visual effect while we're waiting in the `'LOSS'` state. In each frame, instead of clearing the canvas by painting a black rectangle over it, we could use a different colour to make the screen flash.

Define a variable for the interval at which we want to flash the screen:

```js
var LOSS_FLASH_INTERVAL = 0.5;
```

(Where is the best place to put this in our code?)

Then, where we used to just paint a black rectangle over the screen each frame, expand that to this:

```js
  if (state === 'LOSS') {
    var elapsed = frameCount / 60;
    var flash = (elapsed % LOSS_FLASH_INTERVAL) / LOSS_FLASH_INTERVAL;
    var lightness = flash * 50;
    ctx.fillStyle = hsl(0, 100, lightness);
  } else {
    ctx.fillStyle = 'black';
  }
```

If we're not in the `'LOSS'` state, we're going to keep clearing the screen with black. But in the `'LOSS'` state, we use our `hsl()` function that we defined a couple weeks ago to use a different colour based on how far into the `'LOSS'` state we are. Remember, the arguments to the `hsl()` function were: hue, saturation and lightness. `0` as the value of hue gives us red. We'll keep saturation at `100` to mean 100% (full) saturation. We'll just be playing with the ligtness.

We first calculate the elapsed time since we entered the `'LOSS'` state by diving the number of frames we've rendered by 60 (since we paint 60 frames per second, roughly.) Then we calculate the flash amount based on the ratio of the modulus (live explanation will follow) of the elapsed time to the `LOSS_FLASH_INTERVAL` value. Finally, we calculate the lightness by multiplying the flash amount by 50, since a maximum lightness value of 50% gives us a vibrant, fully saturated red.

Here's where we've gotten: <https://jsfiddle.net/atesgoral/x75ut61o/382/>
{: .panel .snapshot }
