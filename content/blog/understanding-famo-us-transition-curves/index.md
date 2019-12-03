---
title: Understanding Famo.us Transition Curves
date: "2014-08-19T17:19:00.000Z"
description: "My own little contribution to the world of JS Framework burnout."
---

The Famo.us front-end framework is an amazing tool for creating performant
web-standard user interfaces. In exchange for abstracting away the traditional
DOM manipulations requires to create web user interfaces, you gain an incredibly
performant system capable of taking advantage of the GPU and render graphics and
animations that are orders of magnitude faster than traditional methods. Learn
more at http://Famo.us.

With that kind of power a world of animation possibilities is open to you as a
developer. After learning how to move elements around, the next order of
business is to figure out how to add physics and life to those animations. An
awesome mechanism that Famo.us provides for you to make this easier it by giving
you an incredible collection of functions typically referred to as animation
curves that impact how the animation progresses. All animation proceeds along a
curve, but by learning to work with the additional curves provided by Famo.us
you can add impact and interest.

In famous, curves are specified in a couple of places. However, the most common
use it to set the curve on a Transitionable and it typically looks something
like this:

```
state.set(100, {duration : 500, curve : 'easeInOut'}); // Changes the value to 100 over half a second using the easeInOut curve
```

In this example a curve is specified, if you don't specify one Famo.us will
default to using a linear curve for you.

A curve modifies how the Transitionable changes over time. In an animation
using the linear curve, if you change a value for 0 to 100 over the course of
100 milliseconds, then in 10 milliseconds we expect that value to be 10. Then at
20 milliseconds we expect it to be 20 and so on. However, if we apply an
'easeIn' curve as an example then the value changes more slowly to begin with
and then more quickly as the animation progresses.

There is no single place where these curve functions are specified in Famo.us.
The basic curves can be found in TweenTransition object. That includes liner,
easeIn, easeOut, easeInOut, and spring. The later is particularly interesting
since it oscillates the value being transition over the time it's being changed.

There's another interesting collection found in the Easing object. Many of them,
like spring in TweenTransitions apply a type of physics to the transitions to
apply them to causing items to bounce or return to the starting postion.

I recommend creating a basic project and practice applying them all to see the
effect.
