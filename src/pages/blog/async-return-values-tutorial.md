---
templateKey: blog-post
title: Cleaner Code with Async / Await Tutorial 
date: '2018-07-30T00:05:26-04:00'
description: >-
  Asynchronous programming in JavaScript used to be difficult to write clean code
  with. Today we have options. You can write asynchronous code with callbacks
  (and face the scary rightward slant of callback hell), use Promises, or use
  async / await. I'll show you why I mostly use a combination of async / await and
  Promises to write cleaner asynchronous code. 
tags:
  - JavaScript
  - ES6
category: Web Development
image: /img/clean-code.png
published: true
---

I mentioned that we have options when writing asynchronous code in JavaScript. For a good explaination on the history of Asynchronous
JavaScript and the 3 approaches (callbacks, Promises, async/await) to writing async code, [check out this article by Toptal](https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial).

I wanted to extend that article by speaking a little bit more about how you can use a combination of async / await, Promises, and async's ability to return a Promise to keep your async code as clean as possible.

## Writing Async Code (with Promises)

Let's say you have a traditional JavaScript function that maneuvers asynchronicity through utilizing a callback parameter.
We want to make this asynchronous using async / await.

```javascript
// ===========================================================
// == This is the function that we want to make asynchronous
// == with async / await.
// ===========================================================

function getJobApplications (callback) {
  database.getJobApplications((err, data) => {
    callback(err, data)
  })
}
```

In this example, the database function `getJobApplications` expects a callback, so there's nothing we can do 
about that, per say. But, we **can** make it async by `Promisifying` it.

```javascript
// ============================================================
// == In order to make this function asynchronous, we "promisify" it.
// == We inner-wrap it with a Promise so that the calling function can 
// == wait for it to be resolved or rejected.
// ============================================================

function getJobApplications () {
  return new Promise((resolve, reject) => {
    database.getJobApplications((err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}
```

This approach of `Promisfying` your function is pretty common. We wrap the inside of the
function with a promise and manually specify when the function should `resolve()` (as the result of a success state) or 
`reject()` as the result of encountering an error.

This is good... and it works, but it's not very DRY (do not repeat yourself). You can quickly end up writing several `return new Promise((resolve,reject) => {})` inner-wrappers for just about everything you'd like to make async. 

Anytime you have a function that relies on a **callback** that you want to wait on with `await`, you'll pretty much always have to `Promisify` the function.

## Async functions automatically return a Promise

In other scenarios, when we start relying on more and more of our codebase to use `async` functions, something beautiful starts to happen.

Here's a simple example:

```javascript
async function sayHello () {
  return "Hello";
}

sayHello().then(str => console.log(str)); // => Hello
```

Because **the return value of an async function will always be a promise**, even if you don't explicitly return a promise, the value you return will automatically be wrapped in a promise.

Here's a more real-world looking example:

```javascript
async function getProfile (authToken, studentId) {
  try {
    let data = await Promise.all([
      getJobApplications(studentId),
      getAccountSettings(accountSettings),
      getProfileDetails(studentId)
    ]);

    // Implicitly wraps this return value in a promise
    return {
      apps: data[0],
      account: data[1],
      profile: data[2]
    }
  }

  catch (err) {
    // handle error
  }
}

async function handleGetStudentProfile (req, res) {
  let authToken = req.decoded.token;
  let studentId = req.decoded.studentId;

  try {
    await checkIfAuthenticated(authToken);
    let response = await getProfile(authToken, studentId)
    return res.status(201).json(response)
  }

  catch (err) {
    // Handle errors
  }
}

```

Suddenly, things are a lot more readable and there are a lot less layers of code that need to be `Promisified`.

What about errors? If the return value is always wrapped in a promise, what does that mean about when an error occurs?

```javascript
async function getProfile (authToken, studentId) {
  try {
    ...
  }

  catch (err) {
    // Error handling is simpler and looks a lot more like how it would
    // in synchronous code.
    return new Error(err)
  }
}
```

We can catch it the same way using `try/catch` blocks like we would in synchronous languages. This is much
more readable.

## Looping with Async (Bye bye IIFEs and ES5 Closures)

Looping over async stuff while keeping the current value of the Iterable in scope was always something kind of tricky before ES6. It required the understanding of [JavaScript closures](http://javascriptissexy.com/understand-javascript-closures-with-ease/). 

In ES5, we were able to create closures to solve this problem.

For example, if we were trying to update every Student's favourite food on their student profile to say
that they like bananas, we could try something like this in this ES5 example.

```javascript
var promises = [];
for (var i = 0; i < students.length; i++) {
  var student = student[i];
  console.log(
    `Updating student=${student.name} to say that they like bananas.
  `);

  promises.push(function() {
    // If they don't already like bananas
    if (student.favouriteFood !== "Bananas") {
      // They'll like 'em now.
      student.favouriteFood = "Bananas";
    } else {
      console.log('This student is cool, he already likes bananas :)');
    }
    return database.save(student);
  })
}

Promise.all(promises)
  .then((result) => {
    // Done!
  })
  .catch((err) => {
    // Handle error
  })
```

But this **wouldn't work**. 

The problem is that the ```student``` we've brought in as a local variable for each iteration of the loop is not going
to be the same as the ```student``` that we save to our promises array in the anonymous function. 

This is largely due to the fact that ```var``` is not block scoped. 

If we ran this, we'd observe that the last student, at ```students.length - 1``` is updated ```students.length``` times.

Ok, how do we fix this in ES5? We encapsulate the part of this block that we'd like to keep as a block (that doesn't change) as a closure.


```javascript
var promises = [];
for (var i = 0; i < students.length; i++) {
  var student = student[i];
  console.log(
    `Updating student=${student.name} to say that they like bananas.
  `);

  (function (student) {
    promises.push(function() {
      // If they don't already like bananas
      if (student.favouriteFood !== "Bananas") {
        // They'll like 'em now.
        student.favouriteFood = "Bananas";
      } else {
        console.log('This student is cool, he already likes bananas :)');
      }
      return database.save(student);
    })
  })(student);
}

Promise.all(promises)
  .then((result) => {
    // Done!
  })
  .catch((err) => {
    // Handle error
  })
```

Now, not to throw out too much terminology, but closures are [IIFEs](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6) which will... evaluate immediately. 

If we did it this way, we'd be binding the current value of ```student``` to a scope where the reference to student cannot change on each iteration of the loop. 

Okay, great. But that sucks to have to do. How execute async code in ES6 and bind the current local variables to the block's scope?

Like this...

```javascript
var promises = [];
for (var i = 0; i < students.length; i++) {
  const student = student[i]; // we could also use let instead of const
  console.log(
    `Updating student=${student.name} to say that they like bananas.
  `);

  promises.push(function() {
    // If they don't already like bananas
    if (student.favouriteFood !== "Bananas") {
      // They'll like 'em now.
      student.favouriteFood = "Bananas";
    } else {
      console.log('This student is cool, he already likes bananas :)');
    }
    return database.save(student);
  })
}

Promise.all(promises)
  .then((result) => {
    // Done!
  })
  .catch((err) => {
    // Handle error
  })
```

```const``` and ```let``` are block scoped unlike var. Check em out.

And then using some of the other great things we've learned in this article, we can clean this function up
even more.

```javascript
async function updateStudents () {
  for (let student of students) {
    console.log(
      `Updating student=${student.name} to say that they like bananas.
    `);
    if (student.favouriteFood !== "Bananas") {
      // They'll like 'em now.
      student.favouriteFood = "Bananas";
    } else {
      console.log('This student is cool, he already likes bananas :)');
    }
    await database.save(student);
  }
}

updateStudents()
  .then(() => {
    // Go your merry way
  })
  .catch((err) => {
    // There was a boo boo
  })
```

Now that's readable as hell.

Try this out in your browser. See if you can guess what's supposed to happen.

```javascript
const students = ['josh', 'khalil'];

async function asyncTest () {
  for (let student of students) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(student);
        resolve();
      }, 3000);
    })
  }
  console.log('For loop completed')
}

asyncTest()
  .then(() => {
    console.log('Done!')
  })
  .catch((err) => {
    console.log('An error', err)
  })
```

It's supposed to print out:

```javascript
Promise {<pending>}
// wait 3 seconds
josh
// wait 3 seconds
khalil
For loop completed
Done!
```

I hope this article was helpful in explaining how async functions make your code a lot cleaner! If you have any questions or can suggest any edits, please feel free to leave a message in the comments.

Now get building, friends.

