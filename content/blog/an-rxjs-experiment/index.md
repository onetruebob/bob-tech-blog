---
title: An RxJS Experiment
date: "2016-03-13T19:52:00.000Z"
description: "Let's get functionally reactive."
---

One of the joys of working at a startup is that everyone has to wear a lot of
hats. At SalesWise this week, I got to put on the hat of getting the word out
about a new product I'm really excited about [SalesWise Meeting Manager](http://SalesWise.com). We have some folks focused on marketing, but Jason, my
boss, asked if I could help them out with a little better targeting for our
Twitter campaigns.

To do that, I spent a few hours earlier this week writing a node script to
access the twitter API and try to find users who would be a good fit for our
product based on job title. It was a one off script, and the end result of a few
hours of work was something that worked, but was such a callback nightmare I
hope I'll never have to maintain that.

That evening, I was thinking about the program and remembered that I'd been
talking with a fellow Front End Engineer, Leroy, at work about working with
observables and using RxJS for functional reactive programming. This problem
seemed like the perfect opportunity to try it out. So I did.

I eventually had to result to being a \"Full Stack Overflow\" engineering to
figure out how to solve the problem of Twitter's paged user searching using Rx.
But after that, the rest of the programs flow just fell right out of it.

I've posted my work to GitHub. Feel free to [check it out](https://github.com/onetruebob/twitter-user-search).

P.S. Also I want to post a shout out. Along the way, I had some of my own
questions about how parts of RxJS worked. Eventually @SteveALee on Twitter
kindly pointed me to an [amazing Gitter group for RxJS](https://gitter.im/Reactive-Extensions/RxJS). A great place to go and ask
questions.
