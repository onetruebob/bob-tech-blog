---
title: "Automated Testing: TDD, Experimentation, and the Front-End"
date: "2015-01-23T08:17:00.000Z"
description: "Sometimes you can test using code. Sometimes you find other ways to test."
---

A recent conversation amongst some of my fellow Hack Reactor alumns got me
thinking about one of my favorite development practices, and why the current
direction of my career (working in UX and the Front End) seems to keep pulling
me away from it.

I've been practicing TDD (Test Driven Development) off and on as a software
engineer since early 2000s. I'm a full on convert about it. In TDD before you
begin coding the functionality of your program, you first write an automated
test that validates that, what you're about to create, returns the results you
would expect. Then you run the test and see that it fails. Next you write the
code that makes the test pass and see that it passes. Finally you might change
the code you wrote confident in the knowledge that if you break it, your tests
will catch it. At Hack Reactor they refer to this testing pattern as: Red,
Green, Refactor.

The beauty of TDD is that it's a forcing function. It ensures that:

- You understand the the problem you're trying to solve. (For a given input you
  know what the expected output is.)
- You've thought through the API of the problem you're trying to solve. (You
  are more likely to define an easy to use API if you are forced to use it up
  front in your tests.)
- That you know your code works before writing other code that depends upon it.
  (This is huge. TDD seems slower at first, but because you know you can trust
  you're code it helps you work faster overall.)
- That if something else in the system breaks your code, you have an easy way
  to find out about it.

Still, there are two classes of problems that make this kind of development
really difficult in some cases.

One, is when you aren't exactly sure what your building. If you don't yet know
that your tackling the right problem or that the solution you're hoping to
create is actually achievable, then how can you even define what you are going
to test?

I propose that this situation calls for a different kind of Test Driven
Development... in this case your test is really to answer the above issues in
the form of an experiment. This idea, is one of the central tenants of the Lean
build, test, learn cycle. In this case, you're writing code to create a single
instance, non-automated test. You're experimenting to see if your problem can
even be solved and that your approach can even work. (Usually by looking at the
parts of the problem you don't understand and taking a stab solving them.)

This isn't a new idea... several decades ago Fredrick Brooks wrote in The
Mythical Man Month to \"build one to throw away.\" The experiment you create here
should not ever make its way into production. Rather it's a kind of guide to the
code you will later write for product. And you can apply TDD to that.

Another sticky area for TDD is the Front-End. It's not that people haven't tried
to create tools to solve automated testing for the front-end, it's just that
implementing them rarely reaps many rewards.

I see two big reasons for this:

- I'm not aware of any front-end automated testing suites that actually test
  the right things.
- The front-end, more that any other part of the system, is in a constant state
  of flux.

When it comes to front-end automated testing tools today, there are really only
two kinds of testing they do: Some ensure that certain expected strings exist
within the UI and maybe are placed as expected within the hierarchy. (This can
be labels, certain types of controls, or ids associated with them.) The other is
basically to do pixel (i.e. screen shot) analysis and compare the way the UI
looks now with how it looked at some point before.

One issue with this is that modern UI is a lot more dynamic than it used to be.
How can these systems notice that the animation is working as designed or that
the sounds are being produced the right way. It's concievable that this might be
solved by more advanced tools in the future.

The biggest issue, however, is that none of the things the automated tools
measure actually matter very much in a production user interface. What really
matters are the kinds of things we measure in a usability test:

- Was the user able to figure out how to get the system to do what they needed
  to do?
- Was the systems output what the user expected to get?
- How long did it take for the user to accomplish a task?
- How many mistakes did they make.
- How did the UI make them feel about accomplishing the task?

The UI is about interfacing with a human. Unfortunately, humans are very
difficult and/or expensive to automate.

Even if you can solve for that problem with some kind of mechanical turk user
testing solution, there's another big problem: The UI layer of an application is
likely the most mauable and changing part of a software system.

Bill Scott, VP of Product Development at PayPal, calls the UI the
\"experimentation layer.\" The companies that seem to be creating the most useful
and delightful user experiences are constantly tweaking or whole-sale revamping
the UI layer of thier applications. So assuming you even had the right tools to
automatically measure the right aspects of a UI, the whole thing is likely to
soon get ripped out from under whatever tests you put in place.

How can you automatically test a constantly changing experiment?

I'd love to hear your ideas.
