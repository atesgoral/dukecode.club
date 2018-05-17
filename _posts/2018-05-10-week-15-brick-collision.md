---
title: "Brick Collision"
week: 15
---

Here's where we've left off: <https://jsfiddle.net/atesgoral/x75ut61o/1378/>
{: .panel .snapshot }

We'll wrap up this game by adding brick-to-ball collision detection. To make this into a full game, there's a lot of shuffling and addition of code we would have to do and we wouldn't have time to learn some new things. Things have already drammatically gotten different/complex since we introduced the physics engine.

In the function where we add new bricks to the game, let's add a line to mark the physical bodies of bricks as bricks, using a new Boolean property called `isBrick`:

```js
function addBrick(x, y, color) {
  var body = world.createBody(Vec2((x + c.width / 2) / SCALE, (y + c.height / 3) / SCALE));
  body.createFixture(brickShape, brickFix);
  body.color = color;
  body.isBrick = true;
  bricks.push(body);
  return body;
}
```

And then in the `pre-solve` event handler (where the physics engine tells us that there has been a collision between two bodies), let's see there's a brick collision:

```js
  var isBrick = a.isBrick || b.isBrick;
```

And finally, we need to check if a brick and ball collision happened and change the color of the brick to white:

```js
  if (isBall && isBrick) {
  	if (a.isBrick) {
    	a.color = 'white';
    } else {
    	b.color = 'white';
    }
  }
```

Here's the final version of our game: <https://jsfiddle.net/atesgoral/x75ut61o/1479/>
{: .panel .snapshot }

We'll start with something new next week!
