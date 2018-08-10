---
templateKey: blog-post
title: 5 Reasons Why You Should Be Selling On Shopify In 2018
date: '2018-06-15T00:05:26-04:00'
description: >-
  OK. Let's face it. I'm a fan. If you're in the business of selling products
  online or you're thinking about making the jump to opening up your brick &
  mortar store to sell online, you should be looking at Shopify. Why? Because
  it's awesome. This article will give you 5 great reasons why you should use
  Shopify to build your ecommerce business.
tags:
  - Shopify
category: Ecommerce
image: /img/artboard-–-1.png
published: false
---

```javascript
// constructor
var ParentClass = function () {
  // constructor
  this.defaultName = 'DOOM';
};

ParentClass.prototype.sayHelloTo = function (name) {
  console.log('Hi ' + (name || this.defaultName) + '!');
};

var ChildClass = function () {
  // optional, only if you want to call parent constructor
  // this is synonymous to super() in ES6
  ChildClass.prototype.constructor.apply(this, arguments);
};

// inheritance 
ChildClass.prototype = Object.create(ParentClass.prototype);

ChildClass.prototype.sayHelloTo = function (name) {
  name = name || this.defaultName;
  name = name[0].toUpperCase() + name.slice(1);

  // call parent class method
  ChildClass.prototype.constructor.prototype.sayHelloTo.call(this, name);
};

// instanceof

var a = new ParentClass();
var b = new ChildClass();

console.log(b instanceof ChildClass); // => true
console.log(b instanceof ParentClass); // => true
console.log(a instanceof ChildClass); // => false
console.log(a instanceof ParentClass); // => true


console.log(a.sayHelloTo()); // => "Hi DOOM!"
console.log(b.sayHelloTo()); // => "Hi DOOM!"
console.log(a.sayHelloTo('avetisk')); // => "Hi avetisk!"
console.log(b.sayHelloTo('avetisk')); // => "Hi Avetisk!"
```

## Why not to use "Y.prototype = new X()"?
This is an anti-pattern. The reason why we don't want to do this is because when we use the `new` keyword, we
construct a new instance of X, passing in no arguments. This means that every subsequent instance of Y will not
have the ability to actually "inherit" any properties from it's prototype X since we've already instantiated the parent class.

```javascript
var EventEmitter = require('events').EventEmitter;
var util = require('util')

function ChatServer (arg1, arg2) {
  // call the super constructor to initialize 'this'
  EventEmitter.call(this);
  // Now we can define whatever else we want to place onto 'this'
  this._clients = [];
}

// Lastly, we have to define that our class needs to use EventEmitter as the prototype.
// In Node.js, we use the util module and do it like follows:
util.inherits(ChatServer, EventEmitter);

// In other places (vanilla JS), you can do it like this:
ChatServer.prototype = Object.create(EventEmitter.prototype);
```

## Why do we need to use Object.create()?
Well, there's this thing called [monkeypatching](https://stackoverflow.com/questions/5626193/what-is-monkey-patching).

If someone were to change the properties and methods of `ChatServer` during runtime, if we had done `ChatServer.prototype = EventEmitter.prototype`, we're
saying that those are the same prototype (ie: the same object), so if you change one, you change both.

It's better for each class to have their very own prototype object.

`show 2 diagrams here, one where ChatServer and EventEmitter both point to the same prototype object, which initially belongs to EventEmitter. And the other diagram where ChatServer and EventEmitter both have their own prototypes, but ChatServer's event emitter is a copy of EventEmitter's prototype.`

## Why do we need to use util.inherits() in Node.js?
We don't actually need to anymore if you're using ES6. `util.inherits()` was implemented during a time when we couldn't use the `extends` keyword to do inheritance in Node.js. 

It's recommended to use `extends` if you're writing ES6 code and `util.inherits()` if you're not.

## Topics
- classical inheritance
- multiple inheritance (mixins)
- inheritance 
- object.create() with JavaScript
- util.inherits()
- interfaces in JavaScript

## Links & Resources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
- https://stackoverflow.com/questions/43575793/why-is-the-usage-of-util-inherits-discouraged
- https://stackoverflow.com/questions/6887828/does-javascript-support-multiple-inheritance-like-c
- https://coderwall.com/p/sd9lda/js-inheritance-is-awesome-and-you-re-doing-it-wrong
- https://www.webreflection.co.uk/blog/2016/03/23/javascript-interfaces
- https://stackoverflow.com/questions/8898399/node-js-inheriting-from-eventemitter