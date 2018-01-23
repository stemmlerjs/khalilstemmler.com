---
title: Etherwatch Cloud Monitoring Research Project
tags:
  - AWS
  - IPTables
  - JavaScript
  - Cloud Networking
metaimg: 'http://khalilstemmler.com/images/blogcontent/callback1.png'
categories:
  - - JavaScript
    - Cloud Networking
date: 2018-01-22 21:06:39
---

This blog post is actually a transcribed report that myself, Alex Kaczmarek and Brandon Dwyer wrote while we were taking Applied Security Principles for our Internet Communications Technology Diploma back in late 2016. It was easily one of my favourite projects because it allowed me build a cohesive project involving both advanced networking and modern software development.

<!-- more --> 

My professor told us that as researchers, we must all have a question to ask. At the time, the question was:

# “HOW CAN ONE SECURELY ACCESS AND MONITOR SDN RESOURCES IN REAL-TIME WITH A CLIENT-AGNOSTIC API SET?”

For this project, we wanted to take a real-time approach to monitoring important metrics and logs inside a customer VPC by designing an API that works for all HTTP-enabled devices. However, as with all cloud technology, it can be complicated and overwhelming given the sheer amount of tools and idiosyncrasies involved in the basic operation.

![Alternative Text](/images/blogcontent/cloud-monitoring/1.JPG "Alt text")

With a plethora of tools available on Amazon Web Services, we needed to sift through the noise and become decently informed on the sheer essentials such as how AWS tackles network basic functions like routing decisions and learn the best practices for access control and security.

Better understanding the challenge, the problems we faced and addressed could be broken into two categories: Access Control and Monitoring. The first half of this document aims to bring light to how AWS does Access Control while the second half outlines the software solution that we’ve developed for monitoring our VPC resources.

Now, get ready for a lengthy blog post because we touch on a lot of different topics and configurations for this one.

# Table of Contents

# End of TOC

When it comes to Amazon Web Services (AWS), networks are fairly abstract to the user. It’s not possible to see how EC2 instances are connected together, or where routers exist that allow us to send information to other networks. In terms of the network, there isn’t a visual representation in contrast to applications such as GNS3. We took a step by step approach building the network, visualizing the topology added services. The first service we added was our own Virtual Private Cloud (VPC) within Amazon’s network; then, we set up public/private subnets within the VPC with EC2 instances within them where necessary.

![Alternative Text](/images/blogcontent/cloud-monitoring/2.JPG "Alt text")

When we sign in to the AWS console, we are presented with a number of different services to select from.

There are even more services as of today (December 2016) than what is pictured; but for our project, the services that were utilized heavily were VPC, EC2 and CloudWatch. 

The next diagram shows the topology that we’re going to be setting up in the first section of the document: AWS Infrastructure.

![Alternative Text](/images/blogcontent/cloud-monitoring/3.JPG "Alt text")

### AWS Infrastructure
# Virtual Private Cloud

Amazon sets up a default VPC for you to place any EC2 instances and networked machines you start up but we preferred to create our own so that we had the ability to use whatever prefix we wanted. In the case of our VPC, we decide to use the 10.0.0.0/16 prefix range. 

Creating a VPC is actually quite simple. Once we have selected VPC in the console, we are sent to the VPC dashboard. Hitting “Create VPC” gives us this prompt:

![Alternative Text](/images/blogcontent/cloud-monitoring/4.JPG "Alt text")

The Name tag field simply allows us to name the VPC we are creating. We’ve named it khalexbrander VPC. 

CIDR Block allows us to choose an IP range for our VPC. Amazon states that we will be unable to create VPC’s larger than /16 (65536 hosts). We settled for the private address range 10.0.0.0/16. 

Tenancy allows us to choose whether or not instances are running on dedicated hardware or not. We’ve stuck with the Default option.

![Alternative Text](/images/blogcontent/cloud-monitoring/5.JPG "Alt text")

# Subnets

Now that the VPC is up and running, we’re able to create our own subnets within the address range and populate them with instances.

Our subnetting scheme is as follows: 10.0.1.0/24 is dedicated to our Management/Continuous Integration server. 10.0.2.0/24 is dedicated to our Database Server, which will only be accessible by the Node App Servers. 10.0.3.0/24 and 10.0.4.0/24 will be used for these Node App Servers. Lastly, the 10.0.5.0/24 subnet is where the public Elastic Load Balancer resides.

Selecting the “Subnets” tab in the same VPC dashboard gives us a button “Create Subnet”, which then displays this prompt: 

![Alternative Text](/images/blogcontent/cloud-monitoring/6.JPG "Alt text")

The Name tag field is for naming the subnets we are creating. Again, here’s our scheme:

10.0.1.0/24 - Public Management and CI
10.0.2.0/24 - Private
10.0.3.0/24 - Public (Apps)
10.0.4.0/24 - Public (Apps)
10.0.5.0/24 - Public ELB

The VPC field allows us to select which Virtual Private Cloud the subnets will exist in. We will be placing the subnets in VPC we created earlier, vpc-81a7bde6 | khalexbrander VPC. 

An Availability Zone is a separate section within the data center. We can choose which zone our subnet will reside in. One would use multiple availability zones in the event that a zone goes down, backup servers still remain functional. We’ve put the subnets into these availability zones:

10.0.1.0/24 - us-east-1a
10.0.2.0/24 - us-east-1b
10.0.3.0/24 - us-east-1d
10.0.4.0/24 - us-east-1a
10.0.5.0/24 - us-east-1e

CIDR block field is where we specify and assign the address range for the subnet creating. 

![Alternative Text](/images/blogcontent/cloud-monitoring/7.JPG "Alt text")

After creating each subnet, we have the final results shown in the Subnet Dashboard as seen above.


















