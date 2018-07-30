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

## Looping with Async

Looping is something that was always very difficult to do with async code. But now, it's a breeze. To loop
in order, we can use the modern for..of loop.

```javascript

for(let id of ids) {
  console.log(
    `Updating student profile with id=${id} to say that they like bananas => ${properId}
  `);
  await queryInterface.sequelize.query(
    `UPDATE student SET favourite_food = ${'bananas'} where student_id = ${id};`
  )
}
```

Now that's readable as hell.

I hope this article was helpful in explaining how async functions make your code a lot cleaner! If you have any questions or can suggest any edits, please feel free to leave a message in the comments.

Now get building, friends.

