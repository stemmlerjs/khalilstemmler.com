---
templateKey: work-page
title: AWS SES Microservice v2
description: Microservice to handle sending mail.
demoUrl: null
repoUrl: https://github.com/stemmlerjs/mail-microservice
public: true
image: /img/aws-ses-small.png
date: '2017-10-19T20:24:21-04:00'
---

This is an simple email sending microservice that can be used in any app that needs to send email (can you think of one that doesn't?).

![SES](/img/ses-details.png)

This project is an improvement over the initial version that I wrote for Univjobs. Here's what makes this version special:

- Slack webhook update on exceptions
- Starts with unique port and announces itself to a service registry
- Reusable with any app
- Expandable

## How does it work?

- Microservice starts on unique port number.
- Announces itself to the service registry defined by environment variable APP_URL.
- Keepalive every 10 seconds (configurable via config.yml)
- Sends email on request to /service
- On error, sends notification via Slack webhook or via email
