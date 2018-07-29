---
templateKey: work-page
title: Health Espresso
description: Drug-to-drug interaction microservice - Health Espresso.
demoUrl: null
repoUrl: null
public: false
image: /img/dtd-small.png
date: '2017-09-10T20:24:21-04:00'
---
<!--Health Espresso (https://www.icarehomehealth.ca/health-espresso/) - speak about the tool I personally built - software architecture  -->
<!-- Make this look more like a NodeJS microservice and then re-upload it.  -->

Health Espresso is a mobile virtual care giver for iOS and Android equipped with voice reminders of medication timings, doctor’s appointments, and health related notifications. 

I was the software architect for this project and worked with the team in Sprint 0 to plan the project sprints.

![Health espresso app](https://www.icarehomehealth.ca/wp-content/uploads/2016/02/health-espresso-app.jpg)

## Stack
- Nativescript
- Sinatra
- PostgreSQL
- AWS

## Drug to drug microservice
After the MVP was built, I was asked to build a feature onto the app that would alert users if the medication that they're about to add will have any interactions with their current medication.

I built the Drug-to-drug interaction microservice using NodeJS, Redis and PostgreSQL.

Since the service, Drugbank, charges based on the number of request per month, I predicted that I was able to save my client money exponentially over time by caching and saving the interactions.

![health](/img/health-espresso.svg)


