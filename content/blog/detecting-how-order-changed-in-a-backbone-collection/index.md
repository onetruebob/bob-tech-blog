---
title: Detecting how ordering changed in a backbone collection
date: "2014-07-06T17:11:00.000Z"
description: "A little Backbone js trick."
---

In a recent Backbone UI project I needed to detect changes to the order of a
playing song queue. When the user changed the order and there was a new song at
the top of the queue I wanted to automatically start playing that song. The
songs were ordered in a `songQueue` collection. Fortunately backbone provides an
easy way to tell when the collection has changed by watching for the `'reset'`
event. What was less clear way how to tell what song was at the top of the queue
prior to reset event firing.

It turns out to be a simple matter to get previous order, but it wasn't clear in
the backbone documentation, so I wanted to make note of it here.

The callback for the collection reset event actually receives two arguments. The
first argument, just as you would expect, contains a collection of models
ordered at the collection now contains them. The second, thankfully, is an
object with one property: previousModels. This is an array containing the models
in the collection and in the order they were in before the reset event was
fired. Prefect!

Here's all I needed to do to see if I needed to setup a different song to play
when SongQueue order changed.

```javascript
var SongQueue = Songs.extend({
  initialize: function() {
    this.on(
      "reset",
      function(current, prev) {
        if (this.at(0) !== prev.previousModels[0]) {
          //If the top song has changed, play the new one.
          this.playFirst()
        }
      },
      this
    )
  },
})
```
