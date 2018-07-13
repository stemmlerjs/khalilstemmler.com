---
templateKey: blog-post
title: NodeJS Microservices Architecture
date: '2018-07-13T11:03:13-04:00'
description: 'Microservices architecture are '
tags:
  - nodejs
  - microservices
  - software development
category: NodeJS
image: /img/me.jpg
published: false
---
https://www.lynda.com/Node-js-tutorials/Implement-time-calculation/509406/555500-4.html?srchtrk=index%3a28%0alinktypeid%3a2%0aq%3anodejs%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2

1. Why Microservices

1.1 They're non monolithic. 

1.2 Easy to add new parts to your application.

\- They should only solve one particular problem.

1.3 Easier to test

1.4 Easier for new developers to understand.

1.5 Resiliency

1.6 We can write microservices in whatever language is best for the job

1.7 Efficient

\- Another approach is to have a common table in a database somewhere, and then write to that from one microservice

\- Let's say you needed to write a microservice in Python but your core application is written in NodeJS. Not a problem. Microservices communicate over HTTP using JSON. 

\
2. Building a Microservice architecture in NodeJS

2.1 Create a service

2.2 Create a Service Registry and Request Handler

2.3 Connect your service to the Service Registry

3. Moving forward

3.1 It scales

\- when we need to serve more requests, we just

3.2 Security

\- There should be specific rules to what your route

3.3 Create more microservices

3.4 Communicating between microservices

\- All you have to do is feed the response from one microservice back to another one.
