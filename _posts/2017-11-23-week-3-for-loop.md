---
title: "For Loop"
week: 3
---

Here's where we've left off: <https://jsfiddle.net/x75ut61o/82/>
{: .panel .snapshot }

We'll learn about the `for` loop!

The `for` statement allows us to perform repetitive tasks by just writing code for a single step of the task, instead of typing lots and lots of code.

The syntax might initially look ugly, but you'll get used to it over time. Here's a `for` loop setup that draws 10 squares in a diagonal pattern:

```js
var ctx = c.getContext('2d');

for (var i = 0; i < 10; i++) {
  ctx.fillRect(i * 10, i * 10, 10, 10);
}
```

To put what we're doing above in English:

First define a new variable called `i` and set its initial value to 0 (`var i = 0`). And while `i` is less than 10 (`i < 10`), do what's inside this block (the part between the `{` and `}`) and then increment `i` by 1 (`i++`).

What we're doing inside the block is drawing a square like we did before, but instead of using fixed values for the x and y coordinates, we're making x and y based on value of `i`.

The loop starts with `i` set to 0. We compute both x and y as `i * 10`. So, on our first iteration, when `i` is 0, both x and y are 0. Remember, anything multipled by 0 is 0!

On the second iteration, since we've incremented `i` by 1, the value of `i` is now 1. So both x and y are now 10.

And so on...

Until we hit the terminating/edge condition. This is when the value of `i` no longer satisfies "while `i` is less than 10". 9 is the last valid value for `i` that satisfies that condition. And when `i` hits the value of 10, we break out of the loop.

So, the values that `i` in this example are: 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. The loop runs exactly 10 times.

<div markdown="1">
Feel free to experiment:

* Use different values instead of 10 to change the loop count. But, don't go too crazy (millions, billions) or you'll freeze the browser!
* Change the multipliers (`* 10`) you use.
* Use `i` in the width and height values.
* Use more interesting operations than just multiplication.
</div>
{: .panel .experiments }

<div markdown="1">
References for the curious mind:

* [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
</div>
{: .panel .references }
