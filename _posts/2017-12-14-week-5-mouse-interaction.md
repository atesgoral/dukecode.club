---
title: "Mouse Interaction"
week: 5
---

Here's where we've left off: <https://jsfiddle.net/x75ut61o/126/>
{: .panel .snapshot }

We'll add some mouse interactivity! We'll cover a lot of ground this week, so use your time wisely!

But, first let's give overselves a headstart and use some CSS (Cascading Style Sheets) + additional JavaScript to extend the canvas to fit the entire panel.

Start with this fiddle: <https://jsfiddle.net/x75ut61o/127/>
{: .panel .snapshot}

CSS allows us to style HTML elements. This includes setting the dimensions of rectangular elements like the page body or a canvas element. Don't worry about CSS for now! But notice what we've added to grow our canvas to git the panel (or screen):

The CSS:

```css
body, html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
#c {
  width: 100%;
  height: 100%;
}
```

The JavaScript:

```js
c.width = c.offsetWidth;
c.height = c.offsetHeight;
```

Now that we have more space to play around with, let's respond to mouse movements!

HTML elements "emit events" in response to user input like key presses, mouse movements, or mouse clicks. You can attach one or more event handlers to any HTML element you want.

The event we'll look at now is the `mousemove` event which gets emitted by an HTML element when you move your mouse over it.

First, remove the `for` loop that draws the diagonally arranged squares.

Now, let's create a new function to handle the event and attach this function as an event handler on our canvas element:

```js
function handleMouseMove(event) {
  drawSquare(event.clientX - 5, event.clientY - 5, 10, hsl(220, 100, 50));
}

c.addEventListener('mousemove', handleMouseMove);
```

What if we wanted to make this work like a drawing application where you have to hold the mouse button down to draw?

Two additional events that are interest to use are `mousedown` and `mouseup`.

`mousedown` gets emitted the moment you press a mouse button. No other mouse button events are emitted while you're still holding the mouse button down.

`mouseup` gets emitted the moment you let go of the mouse button that you've been pressing.

We need to track the state of the mouse button (let's only worry about the left mouse button for now). We need to know if it's being held down.

We can store the state of the mouse button in a new variable. Let's call it `isMouseDown`. When we run our program, since the mouse button will be intially "up", we can set the initial value of this variable to `false`:

```js
var isMouseDown = false;
```

Then let's add two new event handlers to toggle the value of this variable between `true` and `false`:

```js
function handleMouseDown(event) {
  isMouseDown = true;
}

function handleMouseUp(event) {
  isMouseDown = false;
}

c.addEventListener('mousedown', handleMouseDown);
c.addEventListener('mouseup', handleMouseUp);
```

And let's change our `mousemove` handler to check the value of `isMouseDown` and only draw if the mouse button is down:

```js
function handleMouseMove(event) {
  if (isMouseDown) {
    drawSquare(event.clientX - 5, event.clientY - 5, 10, hsl(220, 100, 50));
  }
}
```

The code block inside the `if` statement will only get executed if the condition (the part inside the parenthesis) is satisfied. This will get more evident after we start using a variety of `if` statements.

<div markdown="1">
Feel free to experiment:

* Change the size of the square based on the mouse coordinates or mouse button state.
* Make saturation and lightness dependent on the mouse coordinates or mouse button state.
</div>
{: .panel .experiments }

<div markdown="1">
References for the curious mind:

* [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
* [`mousedown`](https://developer.mozilla.org/en-US/docs/Web/Events/mousedown)
* [`mouseup`](https://developer.mozilla.org/en-US/docs/Web/Events/mouseup)
* [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/Events/mousemove)
</div>
{: .panel .references }

Here's where we've gotten: <https://jsfiddle.net/x75ut61o/129/>
{: .panel .snapshot }
