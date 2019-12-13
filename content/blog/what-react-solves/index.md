---
title: What React Solves
date: "2019-12-12T12:48:00.000Z"
description: "Let's talk about the fundamental problem that the React framework solves and why engineers like me love to use it."
---

Earlier this week I attended everything front-end design and engineering conference An Event Apart in San Francisco. During the meal breaks, the conference organizers placed placards on tables so that groups of like-minded people could get together to share their interests. Topics ranged from "Typography Snob" to "Ski bums." On the second day of the conference, I sat down at a table marked "Loves React", never to be joined by another sole.

Naturally, during further breaks, I was curious to talk to the other attendees and get about pulse about what the other folks thought about React. The An conference tends to attract a great many people who focus primarily on UX issues without doing coding in their day-to-day work as well as practitioners who code only on what Brad Frost calls "the front of the front-end." These are valuable roles, but it makes sense to me why they wouldn't give much consideration JavaScript front-end frameworks.

The concerns I hear about React could be categorized as:
- It's just another front-end framework.
- I prefer to focus on standards that are shipped in the browser.
- I'm worried about technologies like React becoming obsolete quickly
- I prefer to style items with strict CSS and not in JavaScript

These concerns are not particularly wrong, with the exception of the last one. Using React does not in any way necessitate using JavaScript to style your web pages. But, given that, you might wonder why engineers would choose to reach for React.

Before I get into what I consider to be the fundamental value that React provides, let me share some of the pros of using React I heard from people:
- There is a large eco-system of tools written for React.
- React is popular, making it easier to hire engineers that know how to work with it.
- It allows us to render on both the server-side and the client-side.
- 
- Creating CSS in JavaScript helps reduce unnecessary styling and avoid style collisions

Again, all of these are true except the last one. Again, using React does not dictate they way you style your pages.

The primary value that React provides is in building large-scale, highly-performant front-end web applications by changing they way the programmer manages change the DOM of the web page using an approach called "virtual DOM diffing".

> DOM stands for Document Object Model and it's the standard API that web browsers provide to manipulate a web page programmatically. If you're not yet familiar with the DOM you can learn more here.

I'd like to use an example to show just how react changes things.

Let's create a small card on a web page with some text in, that we can toggle using a button.

When we're finish, we'll have something that looks kind of like this:
```pre
---------------------------
| My component says hello | <--- Change this text
|                         |
| ---------------         |
| | Say goodbye |         | <--- When clicking this button
| ---------------         |
---------------------------
```

Before we get into the code, let's consider the approach we might take when programming this.
- Create a variable that tracks the current state of our component.
- Locate the DOM node we want to attach our component to.
- Construct the new DOM nodes needed to render the component and organize them into a hierarchy.
- Create a function that changes the state those DOM nodes.
- Create an event handler on the button that invokes the function we just created when the DOM node is clicked.
- Attach the newly created DOM nodes to the attachment DOM note.

From an HTML perspective, he's how we might statically render the component:
```html
<article>
    <p>My component says <span id="paragraph-salutation">hello</span></p>
    <button>
        Say <span id="alternate-salutation">goodbye</span>
    </button>
<article>
```

And we would embed it in a page with this markup:
```html
<html>
    <div id="js-component-here" />
</html>
```

Ok, let's programmatically build this component:
```JavaScript
// This part makes sure the html document with the div we're attaching to already exisits
window.addEventListener('DOMContentLoaded', () => {
    // 1. Create a variable that tracks the current state of our component.
    const isSayingHello = true;
    
    // 2. Locate the DOM node we want to attach our component to.
    const containerNode = document.querySelector('#js-component-here');
    
    // 3. Construct the new DOM nodes needed to render the component and organize them into a hierarchy.
    const articleNode = document.createNode('article');

    const pgNode = document.createNode('p');
    const pgStaticText = document.createTextNode('My component says ');
    const pgVariableTextHolder = document.createNode('span');
    const pgVariableText = document.createTextNode(isSayingHello ? 'hello' : 'goodbye');
    
    const articleButton = document.createNode('button');
    const buttonText = document.createTextNode(`Say ${isSayingHello ? 'Goodbye' : 'hello'}`);
    
    pgVariableTextHolder.addChild(pgVariableText);
    pgNode.addChild(pgStaticText);
    pgNode.addChild(pgVariableTextHolder);
    articleNode.addChild(pdNode);
    
})
```