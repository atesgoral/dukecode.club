---
title: "Physics and Sprites"
week: 14
---

Here's where we've left off: <https://jsfiddle.net/atesgoral/x75ut61o/580/>
{: .panel .snapshot }

We're going to make quite the leap this week!

As I've mentioned a number of times during our sessions, what we've had far was not a proper physics engine, but a simple approximation just to get things going. Our simple collision detection mechanism worked well for just a ball and a paddle, but things immediately get more complicated when we introduce bricks into the game (think about all the different ways a ball can collide with a brick.)

I've also mentioned it's a fool's errand to try to roll one's own physics engine from scratch, since there is a lot of thought and experience put into existing physics engines.

And so, we're scratching the simple ball movement and collision detection and bringing in Planck.js, a 2D physics engine that will do the job of moving objects and detecting collisions.

We'll also start using our own sprites (images) instead of the boring, solid-colour shapes.

Here's a giant leap (lots of things in the code are changing). I've done this part on my own because we simply wouldn't have time to cover everything that's happening. I'll try to briefly explain what's going on later:

Proper physics, boring graphics: <https://jsfiddle.net/atesgoral/x75ut61o/1368/>
{: .panel .snapshot }

As you can see, we're still rendering borig, solid-colour rectangles, because I didn't want to skip to far ahead. You will notice that our ball has now become a square. Because sprites are always rectangular (there's no such thing as a circular sprite). Our ball will look round when we change this white square into an image of a circular object!

Here's where we've gotten: <https://jsfiddle.net/atesgoral/x75ut61o/1378/>
{: .panel .snapshot }
