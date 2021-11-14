---
title: Multiple Calls to $ionicPlatform.ready()
date: "2015-07-12T20:01:00.000Z"
description: "Creating a simple solution to an unexpected problem in Ionic."
---

I've recently been working in the Ionic framework for creating mobile apps. It's
quite capable and really an amazing tool for creating a certain class of apps.
In fact, I and the team working on our most recent project began to trust it so
much, we assumed it could do more than it really can.

The [documentation for the \$ionicPlatform service](http://ionicframework.com/docs/api/service/$ionicPlatform/) shows that it
provides a ready function that takes a callback. That callback is executed when
the ionic platform is loaded and ready or immediately if the platform is already
loaded. So in different places in the application — such as starting the main
app module and starting up a location tracking service — we happily fed the
ionic service our callback functions.

When testing in the browser everything went great. On a mobile device using [the
Ionic View application](http://view.ionic.io) (another awesome resource that
Ionic provides) everything continued to work great.

Then we started the app deployment testing. That's when we started running into
problems. We could never get the navigation service to load correctly. After I
spent a day of debugging and thinking I was tracking down some type of strange
async issue, I found the real problem. It turns out, during the previous tests,
the ionic platform was already ready before we invoked the ready call on the
service. However, during the app deployment testing, the ionic platform was not
yet ready. In that circumstance it turns out the first callback function passed
to \$ionicPlatform.ready() wins and is called back when the platform really is
ready. Unfortunately, other callbacks passed to the function are silently
ignored. (ARGH!)

To get around this, I read the fine print. In addition to taking a callback
function as a parameter, it returns a promise for the platform being ready. (Why
would it need a callback parameter at all?)

I ultimately solved this problem by creating another Factory service that simply
returns the promise. And whatever needs to execute when Ionic is ready simply
provides a callback to the then of that promise. (I no longer trusted the
service itself to return the promise correctly on multiple calls.)

```javascript
angular.module("appName").factory("ionicReady", function ($ionicPlatform) {
  var readyPromise

  return function () {
    if (!readyPromise) {
      readyPromise = $ionicPlatform.ready()
    }
    return readyPromise
  }
})
```

Then I replaced calls to the function with:

```javascript
ionicReady().then(function () {
  // Stuff to do when the platform is finally ready.
})
```

As my kiddo says, Easy Peas-ee.
