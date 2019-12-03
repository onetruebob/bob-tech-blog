---
title: Event Planning in Javascript
date: "2014-06-29T18:37:00.000Z"
description: "Let's practice some inversion of control and take some of the mystery out of creating events."
---

When you're starting out with JavaScript, or any programming language, so much
about it can seem like magic. Early on in my exploratons, events in JavaScript
appeared to fall squarely in that category. With events we were able to tell an
object that we were interested in what it was doing and when it finished doing
things and yet that object had to know little to nothing about us.

In this article we'll look at events and take them from mysterious acts of
prestidigitation to becoming magicians ourselves. To get there, lets host a
little party.

Do you like cookies?

## Making Cookies

## (and ovens, and chefs)

We'll start by exploring why we would even want to have such a thing as an event
system.

Every party needs some goodies. We're having a cookie party, but cookies don't
bake themselves. Let's give them a little help from JavaScript:

```javascript
var cookies = {
  bakeStatus: "dough",
  bake: function(temp) {
    if (temp >= 350) {
      this.bakeStatus = "tasty hot cookies"
    }
  },
}

var oven = {
  foodToCook: "",
  cook: function(food, temp) {
    this.foodToCook = food
    this.foodToCook.bake(temp)
  },
  remove: function() {
    var foodToRemove = this.foodToCook
    this.foodToCook = ""
    return foodToRemove
  },
}

var chef = {
  bakeCookies: function() {
    oven.cook(cookies, 350)
  },
  removeCookies: function() {
    var mmmCookies = oven.remove()
  },
}
```

We've got what we need. Let's get the baking started.

```javascript
chef.bakeCookies()
```

Can't you just smell them cooking right now?

## Events for our Cookie Event

Of course we don't really want our chef to put one little batch of cookies into
the oven and then just stare blankly at until the cookies are ready. That would
be boring for the chef and make for a very short party.

Worse, as it stands now, our chef is going to put cookies in the oven to bake
and never take them back out again! It's going to start smelling like burned
cookies in here soon!

Let's put a clock on the oven that's going to let the chef when the cookies are
ready. Then the oven can do it's thing and our chef can go off and do whatever
else they need to do while the oven is baking. (Hopefully preparing more cookie
dough.)

We can do that by updating the oven's cook method with a little set timeout
magic and a command to the chef:

```javascript
cook: function (food, temp) {
      setTimeout(function(){
        this.foodToCook = food;
    this.foodToCook.bake(temp);
    chef.removeCookies();
  }.bind(this),30000)
}
```

Awesome. Now, when we cook with our oven the food will be ready in just 30
seconds (fast oven!) and our chef will then pull the cookies out of the oven.

This is great, we have cookies! Except now we also have an oddly specific oven
that knows who is operating it (our chef) and tells them exactly what to do next
(remove cookies).chef.removeCookies();

It's fine for now, but it's going to get really annoying when there's no chef
around and we want to use our oven.

This is where events can help us. Instead of the oven telling the chef what to
do, we really want a way to notify anyone who happens to be using the oven when
the oven has finished cooking.

In the word of events, this is called a trigger and it usually looks something
like this: trigger('finished-cooking');

The result of calling the trigger function is that whoever wants to know about
the thing being trigger is then notified and allowed to run. But the object
calling the trigger doesn't really need to know anything about the other
entities out there in the program that are waiting to be notified.

Here's our oven's updated cook method:

```javascript
cook: function (food, temp) {
      setTimeout(function(){
        this.foodToCook = food;
    this.foodToCook.bake(temp);
    this.trigger('finished-cooking');
  }.bind(this),30000)
}
```

We also need a way for our chef to tell the oven that they are interested in
knowing when it's time to remove the cookies. In the world of events, this is
called on and it might look something like this:
on('finished-cooking', this.removeCookies);

Here's our chef's updated bakeCookies method:

```javascript
bakeCookies: function(){
      //Tell the oven that we want to know when cooking is done.
  oven.on('finished-cooking', this.removeCookies)
  //Put the cookies in and start cooking
  oven.cook(cookies, 350);
}
```

Let's build out our oven so it can handle these calls to on and trigger.

```javascript
var oven = {
  //Event properties and methods
  _ovenFinishedCallback: "",
  on: function(callback) {
    this._ovenFinishedCallback = callback
  },
  trigger: function() {
    this._ovenFinishedCallback()
  },

  //Oven properties and methods
  foodToCook: "",
  cook: function(food, temp) {
    setTimeout(
      function() {
        this.foodToCook = food
        this.foodToCook.bake(temp)
        this.trigger()
      }.bind(this),
      30000
    )
  },
  remove: function() {
    var foodToRemove = foodToCook
    foodToCook = ""
    return foodToRemove
  },
}
```

Now when the chef starts cooking:

1.  The chef calls oven.on(this.removeCookies) so oven will know what to do
    when the cookies are ready. (The oven doesn't have to hard-code a function
    call to the chef to know when the cookies are ready.)
2.  The oven's on function takes the callback function passed in and saves it
    to `_ovenFinishedCallback.`
3.  When the oven is finished cooking the cookies, it calls trigger.
4.  trigger, in turn, looks up the saved callback function and invokes it
    causing our chef to remove the cookies from the oven.

The cool thing here is that oven doesn't really need to know anything about who
is using it nor does it have to tell that person what to do when it has finished
cooking.

It just goes \"Hey! I'm done. Do whatever you need to do with that info.\"

## Multiple Events

Now that the oven can notify us when it's done baking, we can expand on it to
notify us when it's done with other things as well. Perhaps the oven needs to
pre-heat before baking can being. Let's update our oven so we can give the
events names and store the callbacks all together with those names.

First, we have to change our callback storage from:
`_ovenFinishedCallback: ''` to `_ovenCallback: {}`.

Now we can store the callbacks for multiple events keyed by the names of the
events themselves. To do this, we'll update on and trigger like so:

```javascript
on: function(eventName, callback) {
     this._ovenCallback[eventName] = callback;
},
trigger: function(eventName){
      if(this._ovenCallback[eventName]){
        this._ovenCallback[eventName]();
  }
}
```

Now when we want to know when the oven has finished preheating we can call:

```javascript
oven.on("preheated", function() {
  console.log("The oven is ready.")
})
```

And when the oven finishes preheating it can call:

`this.trigger('preheated');`

## Multiple Event Listeners

It's awesome that our chef can now listen in on events from the oven, but what
if more people want to know when the oven has finished. Perhaps we want to know
when it's done too, so we can get some cookies fresh out of the oven. Let's
update our oven events to notify them, too.

Once again we'll modify out on and trigger methods:

```javascript
on: function(eventName, callback) {
     if (!this._ovenCallback[eventName]) {
      this._ovenCallback[eventName] = [];
 }
 this._ovenCallback[eventName].push(callback);
},
trigger: function(eventName){
      if(this._ovenCallback[eventName]){
        for(var i = 0; i < this._ovenCallback[eventName].length; i++) {
         this._ovenCallback[eventName]();
    }
  }
}
```

Now anyone who wants to know when our oven has done something can register to
listen to that even.

## Events for All

Now that we've taught our oven how to handle events, we can extend it to all
kinds of objects using the mix-in pattern.

Here we'll create a simple function that can add events to any object. Along the
way we'll even let our trigger method pass arguments to our callbacks:

```javascript
var mixEvents = function(obj) {
  obj._eventCallbacks = {}

  obj.on = function(eventId, callback) {
    if (!this._eventCallbacks[eventId]) {
      this._eventCallbacks[eventId] = []
    }
    this._eventCallbacks[eventId].push(callback)
  }

  obj.trigger = function(eventId) {
    additionalArgs = Array.prototype.slice.call(arguments, 1)
    if (this._eventCallbacks[eventId]) {
      for (var i = 0; i < this._eventCallbacks[eventId].length; i++) {
        this._eventCallbacks[eventId][i].apply(this, additionalArgs)
      }
    }
  }

  return obj
}
```

Now all we have to do to add events to any object is call this function and pass
it the object, like so:

```javascript
var ovenWithEvents = mixEvents(oven)
```

And that's it. Now we know how we can make our own basic event system and add it
to any object of our choosing.

Alright fellow JavaScript magician, now that the baking is done, it's time for
that cookie party!
