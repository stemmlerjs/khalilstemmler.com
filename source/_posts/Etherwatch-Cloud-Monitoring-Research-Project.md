---
title: Etherwatch Cloud Monitoring Research Project
tags:
  - AWS
  - IPTables
  - JavaScript
  - Cloud Networking
metaimg: 'http://khalilstemmler.com/images/blogcontent/cloud-monitoring/58.JPG'
categories:
  - - JavaScript
    - Cloud Networking
date: 2018-01-22 21:06:39
---

This blog post is actually a transcribed report that my colleages Alex Kaczmarek, Brandon Dwyer and I wrote while we were taking Applied Security Principles for our Internet Communications Technology Diploma back in late 2016. It was easily one of my favourite projects because it allowed me build a cohesive project involving both advanced networking and modern software development.

<!-- more --> 

My professor told us that as researchers, we must all have a question to ask. At the time, the question was:

# “HOW CAN ONE SECURELY ACCESS AND MONITOR SDN RESOURCES IN REAL-TIME WITH A CLIENT-AGNOSTIC API SET?”

For this project, we wanted to take a real-time approach to monitoring important metrics and logs inside a customer VPC by designing an API that works for all HTTP-enabled devices. However, as with all cloud technology, it can be complicated and overwhelming given the sheer amount of tools and idiosyncrasies involved in the basic operation.

![Alternative Text](/images/blogcontent/cloud-monitoring/1.JPG "Alt text")

With a plethora of tools available on Amazon Web Services, we needed to sift through the noise and become decently informed on the sheer essentials such as how AWS tackles network basic functions like routing decisions and learn the best practices for access control and security.

Better understanding the challenge, the problems we faced and addressed could be broken into two categories: Access Control and Monitoring. The first half of this document aims to bring light to how AWS does Access Control while the second half outlines the software solution that we’ve developed for monitoring our VPC resources.

Now, get ready for a lengthy blog post because we touch on a lot of different topics and configurations for this one.

### Table of Contents
# Access Control

{% raw %}
<br/>
<div class="list-lvl-1">1. AWS Infrastructure</div>
<div class="list-lvl-2">1.1 Networking Topology</div>
<div class="list-lvl-3">1.1.1 Virtual Private Cloud </div>
<div class="list-lvl-3">1.1.2 Subnets</div>
<div class="list-lvl-3">1.1.3 Internet Gateway</div>
<div class="list-lvl-3">1.1.4 Elastic Load Balancer</div>
<div class="list-lvl-2">1.2 EC2 Instances</div> 
<div class="list-lvl-2">1.3 Web Application Topology</div>
<div class="list-lvl-3">1.3.1 App Servers</div>
<div class="list-lvl-3">1.3.2 Mongo DB Server</div>
<div class="list-lvl-3">1.3.3 Management Server</div>
<div class="list-lvl-2">1.4 Security Groups and roles</div>
{% endraw %}


# Monitoring

{% raw %}
<br/>
<div class="list-lvl-1">2. Logging</div>
<div class="list-lvl-2">2.1 AWS CloudWatch</div>
<div class="list-lvl-2">2.2 Daemons, Services and Logs</div>
<div class="list-lvl-3">2.2.1 IPTables Configuration</div>
<div class="list-lvl-3">2.2.2 Aggregation UDCs</div>
<div class="list-lvl-3">2.2.3 Bash Scripts</div>

<div class="list-lvl-1">3. Notification Server</div>
<div class="list-lvl-2">3.1 Node.js</div>
<div class="list-lvl-3">3.1.1 APIs 101</div>
<div class="list-lvl-3">3.1.2 AWS Node.js SDK</div>
<div class="list-lvl-3">3.1.3 Custom APIs (authenticate, verify, logs, ec2)</div>
<div class="list-lvl-3">3.1.4 JWT (JSON Web Tokens)</div>
<div class="list-lvl-2">3.2 TCP Socket Application: Socket.IO</div>
<div class="list-lvl-3">3.2.1 Client Application (include state diagram)</div>
<div class="list-lvl-3">3.2.2 Server Application (include state diagram)</div>
<div class="list-lvl-3">3.3 DigitialOcean Droplet</div>
<div class="list-lvl-4">3.3.1 Security Observations</div>

<div class="list-lvl-1">4. HTML5 Apps</div>
<div class="list-lvl-2">4.1 Ionic Platform</div>
<div class="list-lvl-2">4.2 App Implementation</div>
<div class="list-lvl-3">4.2.1 Login and Dashboard</div>
<div class="list-lvl-3">4.2.2 Metric Stats</div>
<div class="list-lvl-3">4.2.3 Real-time Logging</div>
<div class="list-lvl-3">4.2.4 Log Groups</div>
<div class="list-lvl-3">4.2.5 Log Streams</div>
<div class="list-lvl-3">4.2.6 Real-time Stream</div>
<div class="list-lvl-2">4.3 Server Output</div>

<div class="list-lvl-1">5. Links and Resources</div>


{% endraw %}

### 1. AWS Infrastructure

When it comes to Amazon Web Services (AWS), networks are fairly abstract to the user. It’s not possible to see how EC2 instances are connected together, or where routers exist that allow us to send information to other networks. In terms of the network, there isn’t a visual representation in contrast to applications such as GNS3. We took a step by step approach building the network, visualizing the topology added services. The first service we added was our own Virtual Private Cloud (VPC) within Amazon’s network; then, we set up public/private subnets within the VPC with EC2 instances within them where necessary.

![Alternative Text](/images/blogcontent/cloud-monitoring/2.JPG "Alt text")

When we sign in to the AWS console, we are presented with a number of different services to select from.

There are even more services as of today (December 2016) than what is pictured; but for our project, the services that were utilized heavily were VPC, EC2 and CloudWatch. 

The next diagram shows the topology that we’re going to be setting up in the first section of the document: AWS Infrastructure.

![Alternative Text](/images/blogcontent/cloud-monitoring/3.JPG "Alt text")

### 1.1 Networking Topology
# 1.1.1 Virtual Private Cloud

Amazon sets up a default VPC for you to place any EC2 instances and networked machines you start up but we preferred to create our own so that we had the ability to use whatever prefix we wanted. In the case of our VPC, we decide to use the 10.0.0.0/16 prefix range. 

Creating a VPC is actually quite simple. Once we have selected VPC in the console, we are sent to the VPC dashboard. Hitting “Create VPC” gives us this prompt:

![Alternative Text](/images/blogcontent/cloud-monitoring/4.JPG "Alt text")

The Name tag field simply allows us to name the VPC we are creating. We’ve named it khalexbrander VPC. 

CIDR Block allows us to choose an IP range for our VPC. Amazon states that we will be unable to create VPC’s larger than /16 (65536 hosts). We settled for the private address range 10.0.0.0/16. 

Tenancy allows us to choose whether or not instances are running on dedicated hardware or not. We’ve stuck with the Default option.

![Alternative Text](/images/blogcontent/cloud-monitoring/5.JPG "Alt text")

# 1.1.2 Subnets

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

# 1.1.3 Internet Gateway

Next, we need to be able to get traffic into our VPC as well as provide our instances the ability to communicate outside of AWS. In the VPC Console, we can create an Internet Gateway.

![Alternative Text](/images/blogcontent/cloud-monitoring/8.JPG "Alt text")

The Name tag again is simply naming the gateway. We’ve named this khalexbrander GW.

When we added the gateway to AWS, it implicitly created a Route Table, the primary use of route tables is to add associations of the route table to other subnets. We’ve associated the route table to our Node App Server subnets and now they can access the internet. We explain the mechanics behind how Route Tables work later in the Route Tables and Security Groups section.

# 1.1.4 Elastic Load Balancer

Now we prepare an Elastic Load Balancer so that traffic destined to our webpage hosted by the App Servers will be load balanced.

To do this we visit the EC2 dashboard, select “Load Balancers” and “Create Load Balancer”. 

There are two choices, Application or Classic Load Balancer. The difference is that the Application LB makes routing decisions at the application layer (HTTP/HTTPS) while the Classic LB makes routing decisions at either transport (TCP/SSL) or application (HTTP/HTTPS). We chose to use a Classic Load Balancer. 

After selecting the Classic Load Balancer, we move onto the basic configuration.

![Alternative Text](/images/blogcontent/cloud-monitoring/9.JPG "Alt text")

As mentioned previously, we named the Load Balancer khalexbrander-lb2dot0. We use the option Create LB inside to associate the LB to the user created VPC, khalexbrander. 

The webpage that is being run on both AppServers listens on port 80 (HTTP). The configuration above will send traffic that arrives on the Load Balancer’s port 80 to port 80 on the instances that are associated with it. We’ve configured the ELB to send traffic to both of these servers running in different availability zones.

![Alternative Text](/images/blogcontent/cloud-monitoring/10.JPG "Alt text")

Next we assign a Security Group to be associated with the Load Balancer. Security groups will be explained in detail further in the report, as of now we associate the Load Balancer to the security group ELB2nodeAppServers which only allows HTTP traffic as well as ICMP, and denies anything else.

![Alternative Text](/images/blogcontent/cloud-monitoring/11.JPG "Alt text")

Now we have created a fully functioning Load Balancer! To test if we are able to communicate to the Load Balancer, we run nslookup on the DNS Name khalexbrander-lb2dot0-1766863992.us-east-1.elb.amazonaws.com and ping the associated IP (54.84.172.8).

![Alternative Text](/images/blogcontent/cloud-monitoring/12.JPG "Alt text")

### 1.2 EC2 Instances

When it comes to populating our network with applications/servers, we implement Amazon’s very own Elastic Compute Cloud (EC2). Within this dashboard, we have a plethora of options to choose from in terms of Operating Systems for the instances that we launch. 

To launch an instance, we go to the EC2 dashboard, “Running Instances” and press “Launch Instance”.

![Alternative Text](/images/blogcontent/cloud-monitoring/13.JPG "Alt text")

The first two OS’s are pictured, Amazon’s own Linux distribution that is AWS supported as well as Linux Red Hat. Below those two are several versions of different Windows Servers (2016, 2012, 2008, 2003), Ubuntu Servers and SUSE Linux Enterprise Servers. For our purposes, we stuck with Amazon’s Linux AMI. 

We then have to choose an instance type. The instances vary from how many vCPUs, how much memory (GiB), Instance Storage, and Network Performance. Network performance is generalized for the lower level instance types, but for more powerful instances state the bandwidth (10Gigabit, 20Gigabit). Since we are using AWS Free Tier, we are using the instance type shown below that is eligible for our use - t2.micro.

![Alternative Text](/images/blogcontent/cloud-monitoring/14.JPG "Alt text")

Now we’ll move on to configure the important details of the instance.

![Alternative Text](/images/blogcontent/cloud-monitoring/15.JPG "Alt text")

For our network, we will have a total of four instances: Management Server, MongoDBServer, NodeAppServer1, NodeAppServer2. All of these instances will be within khalexbrander VPC, the subnets however will vary. 

Below is a small diagram that will depict where each instance will reside in relevance to subnets.

No Public IP’s are going to be assigned to any instances at the current moment. They will all receive respective private addresses from the subnets.

The last option that is imperative to select is Enable CloudWatch Detailed Monitoring. This will allow Amazon’s CloudWatch to monitor, collect and analyze specific metrics. 

The last step is to configure security groups for each instance we have created, but before going into detail of how we have achieved that, each instance and their function will be outlined.

### 1.3 Web Application Topology

![Alternative Text](/images/blogcontent/cloud-monitoring/16.JPG "Alt text")

# 1.3.1 Node App Servers 1 & 2

The NodeAppServers host a simple web app called “Movie Quotes”. It allows users to view and submit new movie quotes. These app servers communicate directly with the database server to persist and retrieve movie quotes that have been submitted and saved.

# 1.3.2 MongoDB Server

This server runs on one port (27017) and it is the only port that is exposed on this instance. It will communicate directly with both NodeAppServers exclusively. There should be no other communication from this machine to any other machine, inside or out. 

# 1.3.3 Management Server

The purpose of the management server is to allow us to have SSH access into the instances within the network. Since NodeAppServer1, NodeAppServer2 and MongoDBServer do not have publically accessible IPs, we gave the Management server a public IP so that we could reach it over SSH to console into the other private instances if necessary. For example, to SSH into NodeAppServer 1, after setting up keys between instances, we would just do:

```bash
ssh -i "khalexbrander.pem" ec2-user@10.0.4.12. 
```

# 1.4 Security Roles and Groups

The benefit of using Security Groups and Roles is that it’s modular and simple in design. We simply deny all traffic and allow only what’s required between particular roles and groups; this makes it easier to maintain. Here are the security groups as we’ve configured them.

![Alternative Text](/images/blogcontent/cloud-monitoring/17.JPG "Alt text")

NodeAppServers are allowed SSH access from only 10.0.1.0/24, which would be the Management Server. ICMP access is given to the entire VPC for reachability testing. HTTP access (Port 80) is given to a security group that is associated to the Elastic Load Balancer. This ability to have a security group as a source exemplifies a great level of modularity, such as if the IP addresses changed for the load balancer.

![Alternative Text](/images/blogcontent/cloud-monitoring/18.JPG "Alt text")

The MongoDBServer will also give SSH access to ManagementServer. ICMP traffic for reachability is allowed but only by the ManagementServer. Port 27017 access is granted to only the NodeAppServers. This port allows communication to the actual database that is running on the instance.

![Alternative Text](/images/blogcontent/cloud-monitoring/19.JPG "Alt text")

The ManagementServer’s SSH access was played around with a lot but to simplify, we used the source 142.55.0.0/16 for Sheridan’s entire address range. Port 8080 is open because this is the port in which Jenkins runs- it needs to be open for us to get into the console and for Github to be able to alert Jenkins to execute a new build when new code is pushed to the Git repository for the “Movie Quotes” app.

Although there is no visual aid with AWS to envision what the network looks like, once the configuration and reachability testing were done, the final topology is as follows:

![Alternative Text](/images/blogcontent/cloud-monitoring/20.JPG "Alt text")

So far, we’ve seen that in an AWS infrastructure, devices (EC2 instances, servers, etc) are not connected in a traditional fashion. Normally, if you want to connect a device so that it gets internet access, it will be attached via Ethernet to a router with internet access- this is not the case with AWS. Our mantra for configuration was “forget Ethernet, embrace associations”.

![Alternative Text](/images/blogcontent/cloud-monitoring/21.JPG "Alt text")

### 2. Logging

Now that we have our instances up and running, and proper connectivity throughout the network, we need to implement a way to pull information from instances within the network to push to AWS CloudWatch. After some research, we have accomplished what we wanted to do by using the following technologies: IPTables, awslogs and some custom bash scripts.

# 2.1 AWS CloudWatch

The three primitives in CloudWatch are namespaces, metrics and logs. 

A namespace is a unique container in CloudWatch for metrics. For example, AWS has a namespace for every feature that they offer.

•	AWS/EC2
•	AWS/CloudWatchLogs
•	AWS/S3

Each of these namespaces has metrics specific to the namespace.

![Alternative Text](/images/blogcontent/cloud-monitoring/22.JPG "Alt text")

Metrics are time-ordered sets of data points published to the cloud that are uniquely identified by the Namespace and Metric Name.

Since metrics are time ordered and represent a value through data points, the AWS API allows us to obtain insights in the form of the following metric statistics: Average, Maximum, Minimum or Sum.

Now, logs are an entirely different animal- they’re pure RAW data. However, there is some structure. The next section attempts to illustrate how they’re organized in AWS.

# 2.2 Daemons, Services and Logs

The primary tool for extracting real-time data from our EC2 instances is awslogs. This is a program that runs on the EC2 instances and communicates directly with Amazon CloudWatch. With this, Amazon also provides a method of data organization in the form of Log Groups and Log Streams. These groups and streams can be manipulated from directly within EC2 instances, making them highly effective. 

To illustrate the usage of Log Groups and Streams, consider the following:

In our AWS topology, there are 4 instances that we want to log in real time. Not only do we want to log these instances’ data usage, but we also want to see the volume of traffic depending on the type; for example, TCP traffic versus UDP traffic. 

Given these requirements, we architected a system that uses one Log Group per instance and a separate log stream for each type of data that we want to track. To illustrate this, here is the structure of the appServer1 log group:

__App Server CloudWatch Structure__

![Alternative Text](/images/blogcontent/cloud-monitoring/23.JPG "Alt text")

From this, it can be seen that we are tracking a multitude of network statistics, not only by type, but also by direction. This gives visibility into where traffic spikes originate from; either internal, or external. Tracking these statistics on this level of granularity with accuracy requires a process that has close access to the traffic that is entering and exiting the machine, which is why we chose to use IPTables as our workhorse for this task.

IPTables has the ability to filter traffic at three main Default Chains: INPUT, OUTPUT and FORWARD. Since this device will not be forwarding any traffic, the lattermost was not used; however, the INPUT and OUTPUT chains are of great interest because this allows traffic to be seen just as it enters the machine and just as it exits the machine. 

IPTables, by design, has counters for the amount of packets and bytes that traverse Chains. We sought to take advantage of this inbuilt function by defining several User Defined Chains (UDC) and directing traffic through them using multiple Jumps from the various chains. The intent was not actual filtration, but just accounting. Therefore, our default policy was to ACCEPT packets, and not deny them.

Here is an image that clearly outlines how we directed traffic using custom written rules. Each node represents a different Chain.

![Alternative Text](/images/blogcontent/cloud-monitoring/24.JPG "Alt text")

A bash script was written to configure IPTables on all instances. Due to the nature of all instances being virtualized, moving these scripts between machines was done through the use of Khalil’s github. While some key points will be outlined in the following pages, the full IPTables scripts can be found at:

[https://github.com/stemmlerjs/netmonitor-scripts](https://github.com/stemmlerjs/netmonitor-scripts)

# 2.2.1 IPTables Configuration

To make the scripts easier to migrate to multiple instances, the IP address of the local machine is only referenced once at the beginning of the script. The only manual work required to make the script run properly is the “myIP” variable as seen in the figure below. The script will then create multiple User Defined Chains to track.

![Alternative Text](/images/blogcontent/cloud-monitoring/25.JPG "Alt text")

Once done, the script will create rules revolving around the local machine’s IP address. The first rules, displayed below, covers the first decision when a packet is received or sent:

![Alternative Text](/images/blogcontent/cloud-monitoring/26.JPG "Alt text")

A fairly simple rule, to say the least. The packets and bytes will be tracked as they are passed to the INPUT and OUTPUT chains, and they are sent off to our own UDC where there is a major bifurcation. 
For both directions, the packets jump to another UDC depending on whether the traffic is TCP or UDP at layer 4. 

![Alternative Text](/images/blogcontent/cloud-monitoring/27.JPG "Alt text")

Next, we wanted to get more granular and see how much of the traffic was SSH specifically. To do this, we wrote a rule to examine traffic that jumped to the previous TCP inbound or outbound Chains. This rule checks if the destination (input) or source (output) port was 22 (SSH port). If true, this would send the SSH-specific traffic to a chain that was separate from all of the other TCP traffic.

![Alternative Text](/images/blogcontent/cloud-monitoring/28.JPG "Alt text")

What is unique about this situation is that the rules were written in such a way the SSH traffic would match both rules in the “tcpIn” and “tcpOut” UDCs displayed above. This means that the SSH traffic will already be accounted for in the “tcpBytes” UDC and will not have to be looped back later to account for it in the aggregation UDCs.

In a similar fashion, inbound and outbound UDP traffic is directed to the udpIn and udpOut Chains, respectively.

# 2.2.2 Aggregation UDCs

Now that traffic has been logged based on the direction, we want to aggregate the values from both directions to obtain figures for total data transfer. In the previous section, the jump target for TCP traffic (both directions) was the “tcpBytes” chain. The counters within IPTables will record both inbound and outbound packets here.

![Alternative Text](/images/blogcontent/cloud-monitoring/29.JPG "Alt text")

Likewise, UDP traffic will also be joined in the “udpBytes” UDC.

![Alternative Text](/images/blogcontent/cloud-monitoring/30.JPG "Alt text")

In a final step to aggregate everything from all protocols, the packets from the “tcpBytes” and “udpBytes” chains are joined into the “allBytes” UDC.

![Alternative Text](/images/blogcontent/cloud-monitoring/31.JPG "Alt text")

To address the previously mentioned “looped” SSH traffic, observe the following UDC Rule:

![Alternative Text](/images/blogcontent/cloud-monitoring/32.JPG "Alt text")

Since we already accounted for all SSH traffic in the tcpIn and tcpOut chains, the aggregated SSH traffic is not redirected to the allBytes chain.

# 2.2.3 Bash Scripts

With IPTables taking account of the traffic as desired, we moved on to obtaining the information from IPTables and logging it to files. These “files” are ultimately what will be pushed to AWS CloudWatch; however, there were many components necessary to make this work.

The below table outlines the exact functionality of all scripts written:

![Alternative Text](/images/blogcontent/cloud-monitoring/33.JPG "Alt text")

The most important script here is “script.sh”. This is the script that actually obtains the information from IPTables’ UDCs and writes it to a file. Let’s break it down:

Using the command “iptables -nvx -L [udcName]”, the precise count of packets and bytes can be obtained.

![Alternative Text](/images/blogcontent/cloud-monitoring/34.JPG "Alt text")

We want to record the number of packets and bytes in two separate variables so that the log files can be formatted cleanly with a high degree of readability. Below is an example of commands used to extract the two values from the aforementioned table:

![Alternative Text](/images/blogcontent/cloud-monitoring/35.JPG "Alt text")

The names of the variables are “tcpPACKETS” and “tcpBYTES”. The whole line that contains the relevant data was uniquely identified by the jump target. The output (the line) was piped to additional commands to restructure the output into delimited fields. The final “cut -f” picks the field with the relevant value (field 2 for packets, field 3 for bytes).

This operation was run on all of the User Defined Chains to obtain a pair of variables representing both the amount of packets and the amount of bytes.

When completed, these variables were incorporated into a string that was appended to a file:

![Alternative Text](/images/blogcontent/cloud-monitoring/36.JPG "Alt text")

Notice that each specific traffic type and direction are given their own log file. This is because each of those files are a separate log stream that we have manually specified in the awslogs.conf file.

![Alternative Text](/images/blogcontent/cloud-monitoring/37.JPG "Alt text")

This means that every time one of these files are updated, or in this case every time the script is run, awslogs will push the change to AWS CloudWatch. These changes can be viewed live from within the AWS console, and in the case of this project they can be viewed in real-time from the application we built.
The final challenge here is to determine the frequency of the logging. To generate a log, we must simply run script.sh; however, we want this process to be automated. To do this, we created the startBytes.sh script. This is a very simple script that runs a while loop that constantly executes the script with a 5 second gap in between each run. Of course, we don’t want this logging indefinitely so we made an exit condition in the form of a simple flag. 

![Alternative Text](/images/blogcontent/cloud-monitoring/38.JPG "Alt text")

The while loop will check to see if a file exists, /tmp/stop, and if it does not the loop will continue to execute the script every 5 seconds. This means that to stop the logging process we just have to meet the condition by creating the file. In an effort to simplify this, another script “stopBytes.sh” was made. 

![Alternative Text](/images/blogcontent/cloud-monitoring/39.JPG "Alt text")

This simply creates the file at /tmp/stop, waits 5 seconds for the loop to detect that the file is present and then deletes the file so that the loop can be run again on command.

The rest of the scripts in the project are made to automate the logging process on the startup of the EC2s and to give us the ability to clear all logs from the CloudWatch system. We have full copies of these scripts at the following git repositories:

[https://github.com/brandonAD/netmonitor-scripts](https://github.com/brandonAD/netmonitor-scripts)
[https://github.com/stemmlerjs/netmonitor-scripts](https://github.com/stemmlerjs/netmonitor-scripts)

### 3. Notification Server

Now, we’re onto the actual software development process of the project. The Notification Server component of our application architecture is probably the glue of the project. Written in Node.js, it provides a set of vital utilities to the project such as being able to:

•	Query AWS for the most recent log and metric data using the AWS Node.js SDK
•	Fulfill various client requests for EC2 stats through a fine grained API set
•	Maintain websocket connections for authenticated users and push new logs to clients in realtime

In this section, we mention a bunch of tech such as Node.js, JSON Web Tokens, DigitialOcean Droplets, the AWS SDK and Socket.io. We’ll try our best to keep it as transparent as possible and at the very least explain what each piece does and how how it fits into the Notification Server architecture.

# 3.1 Node.JS

Node.js (a functional-style programming language) was built for writing event-driven applications and is the primary choice for web apps with asynchronous I/O. It has been said that “these design choices aim to optimize throughput and scalability in Web applications with many input/output operations and performs well for realtime web apps”. [Read more about NodeJS here.](http://readwrite.com/2013/11/07/what-you-need-to-know-about-nodejs/). 

![Alternative Text](/images/blogcontent/cloud-monitoring/40.JPG "Alt text")

Node’s excellence and ease in writing async i/o is the reason we chose to write the app with this language rather than another language like Python or Java; especially since we know we’re going to be doing a LOT of async TCP request fulfillments. 

# 3.1.1 APIs 101

So how do we actually query AWS for things like average network bytes in within the last 30 days or the most recent logs in our NodeApplicationServer1 log group? We’re going to need to use Amazon’s APIs. 

API just stands for Application Programming Interface which literally describes a toolkit for communicating with a set of predetermined methods through a web/app server (usually). The language we’re using to communicate with AWS’s APIs is HTTP; that is, we’re actually just making HTTP requests to invoke a method or return some data. 

In HTTP API development, the common architectural pattern is called REST (representational state transfer). This is an approach that greatly simplifies API development for web-based systems by associating a base url (http://api.com/friends/ for example) with an HTTP Method (GET, POST, PUT, DELETE to name a few). The association of a url with an HTTP Method implies a RESTful action - it gives meaning to the request. 

![Alternative Text](/images/blogcontent/cloud-monitoring/41.JPG "Alt text")

For example, a GET to http://api.com/friends will likely return all of the authenticated user’s friends and perhaps a DELETE to http://api.com/friends/johnkelly will delete the user named “johnkelly” from the user’s friends list.

![Alternative Text](/images/blogcontent/cloud-monitoring/42.JPG "Alt text")

# 3.1.2 AWS Node.JS SDK

The AWS Node.JS SDK is truly truly massive. It allows you to do everything that you can do using the console on screen and more. If you wanted to attach a new VPC to your EC2 or create a VPN connection between an existing VPN and and a VPN customer gateway for example, there are two methods available written in the Node.js sdk that will let you do that exactly…

![Alternative Text](/images/blogcontent/cloud-monitoring/43.JPG "Alt text")

Take note that the AWS SDK operates over HTTP REST but the SDK has been rewritten in many different programming languages as an abstraction over the HTTP so that programmers don’t need to manually construct the HTTP requests for each API call. 

There are thousands of methods in the AWS SDK that will let you do just about whatever you’re looking to do in AWS like this example where they allow you to create a new AWS S3 Bucket and put a brand new object called ‘myKey’ into a bucket called ‘myBucket’.

![Alternative Text](/images/blogcontent/cloud-monitoring/44.JPG "Alt text")

But for our project, we’re only going to be working with 3 different components of the SDK: the EC2, CloudWatch and CloudWatchLogs classes.

After some time playing with the APIs, we were able construct a reusable class that provides ways to access each of the AWS APIs we need for this project. 

![Alternative Text](/images/blogcontent/cloud-monitoring/45.JPG "Alt text")

Examination of the “public constructor” of the class contains self-explanatory method names describing the functionality that the class is capable of.

This is a really good example of a way to “sort through the noise” and pay attention to only what you need. With this class, we’re able to do all the things we need to do regarding logs, EC2 instances and metrics.
These methods will be called on when a RESTful request comes in on the corresponding endpoint (ie: /api/log/streams will call getLogStreams()).

Let’s take a closer look at some of our custom API endpoints we need to setup for HTTP requests.

# 3.1.3 Custom APIs

We already know ahead of time what API REST endpoints we need to create and what they need to do. 

![Alternative Text](/images/blogcontent/cloud-monitoring/46.JPG "Alt text")

The /api/authenticate is a POST method used to authenticate yourself as a valid user to the server. You’re required to pass in your username and password within the body of the request. Here’s what a formatted HTTP POST Request would look like in raw HTTP.

![Alternative Text](/images/blogcontent/cloud-monitoring/47.JPG "Alt text")

To demonstrate the functionality, we wrote a quick command line tool to insert a new user into the database server-side.

![Alternative Text](/images/blogcontent/cloud-monitoring/48.JPG "Alt text")

After creating a new user, we format our request and send it to the server.

On a valid HTTP Response codes 2xx (anything within 200 means the request was more or less successful), we will receive a newly constructed JSON Web Token.

![Alternative Text](/images/blogcontent/cloud-monitoring/49.JPG "Alt text")

In this example, we receive a 201 response code which represents that “The request has been fulfilled, resulting in the creation of a new resource.” [Read more about HTTP Status Codes.](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success).

All other endpoints that we needed to create such as /api/ec2, /api/log/streams, etc all return some amount of AWS information about logs, ec2 instance status and metrics and require a valid JWT token to accompany the request to prove the claim of being authenticated. Failure to provide a valid JWT (tokens expire after 20 minutes and need to be refreshed) returns a 403 Forbidden HTTP Response Code.

![Alternative Text](/images/blogcontent/cloud-monitoring/50.JPG "Alt text")

# 3.1.4 JSON Web Tokens

We’ve placed a lot of faith in our JSON Web Tokens… but what is it really?
The JWT is a JSON-based open standard (RFC 7519) for creating access tokens that assert some number of claims. 

Every JWT is comprised of 3 parts: a header, a payload, and a signature.

Header: Specifies the algorithm used to generate the signature

![Alternative Text](/images/blogcontent/cloud-monitoring/51.JPG "Alt text")

Payload: The claims we’re making

![Alternative Text](/images/blogcontent/cloud-monitoring/52.JPG "Alt text")

Signature: Sign the entire token (header and payload) with the secret key

![Alternative Text](/images/blogcontent/cloud-monitoring/53.JPG "Alt text")

NOTE: This secret key is something that is stored on the server and is used to sign every token.

Finally, the token is created by Base64 encoding each of the 3 sections and then placing them into a single string, delimited by periods.

Ex: 
![Alternative Text](/images/blogcontent/cloud-monitoring/54.JPG "Alt text")

But what does this achieve?
It’s a passport to our RESTful API and TCP Socket App. Sure, a client can decode a token that it receives to view the claims. But what happens if a malicious user tries to change the claims and use the mangled access token? The access token fails because now the signature doesn’t match that of the server.

The majority of authenticated web applications on the modern web are using JSON Web Tokens for authentication, it’s worthwhile to learn a little bit about it.

### 3.2 TCP Socket Application: Socket.IO

![Alternative Text](/images/blogcontent/cloud-monitoring/55.JPG "Alt text")

Socket.io works on the basis of events (which is not surprising in the realm of asynchronocity). Each side of a socket.io TCP client-server connection can either emit(‘eventName’) an event or handle an event – on(‘eventName’). 

![Alternative Text](/images/blogcontent/cloud-monitoring/56.JPG "Alt text")

# 3.2.1 Client Application

For example, in our application, when the client is in a state (see all states in the client state diagram below) as STREAMING/LISTENING, the client is waiting for logging data to come in as payload within the socket connection; it will then be able to pass it to the front-end code to render the logging data on screen.

![Alternative Text](/images/blogcontent/cloud-monitoring/57.JPG "Alt text")

Events and binding handlers to events; that’s the essence of how Socket.io works. However, it does become a bit more complicated when establishing multiple streams on the server, each with different sets of logging data to be returned to the client in real-time. For this, we need a hash table.

# 3.2.2 Server Application

Hash tables are very useful for their quick lookup times (a run-time complexity of O(1) for those with computer science backgrounds). The inclusion of this data structure in the server process is as follows:

1. Client connects to server with JWT token
2. Server accepts connection and marks it as established
3. Client sends a LOG_STREAM_REQUEST containing stream parameters:
  •	LogGroup Name
  •	LogStream(s) Name(s)
4. Server accepts or denies request based on the existence of LogGroups and LogStreams in the form of a LOG_STREAM_REPLY.
5. If a successful request, the server places a tuple of the socket.id (unique identifier of the socket established at handshake time) and the request parameters into the hashtable identified by the socket.id of the requesting client socket.
6. Now, the Server can poll AWS for new log data based on the entries saved in the LOG_STREAM_CONNS hashtable and emit it to the appropriate socket based on the id.
7. On client disconnect, the server removes the tuple from the LOG_STREAM_CONNS hashtable.

![Alternative Text](/images/blogcontent/cloud-monitoring/58.JPG "Alt text")

Now, with everything completed on the server side, both the REST API and TCP Socket App- we needed to look for somewhere to host our backend for our app. We decided to try out DigitialOcean’s Droplet.

# 3.3 DigitalOcean Droplet

GitHub has a Student Developer pass which includes a $50 credit on DigitialOcean so we thought it would be cool to try it out for hosting the Notification Server on. 

![Alternative Text](/images/blogcontent/cloud-monitoring/59.JPG "Alt text")

For $5 a month, we were able to reserve an Ubuntu 16.04 -  512 RAM - 20 GB HDD VM. Setup was really fast and simple (they even have a way to console into the machine straight from the HTML dashboard!).

Within 10 minutes, we had created a pair of SSH Keys, logged into the machine, downloaded and installed Node and the application code from GitHub.

```
root@squeaky:~# git clone https://github.com/stemmlerjs/aws-realtime-network-monitor.git
root@squeaky:~# cd aws-realtime-network-monitor
root@squeaky:~/aws-realtime-network-monitor# npm install && nodemon server.js
```

# 3.3.1 Security Observations
On our server, we should only have 3 ports open:
•	3000 - Websocket server
•	80 - For API calls and Static Web pages
•	22 - SSH Access

We can confirm this by running netstat -tulpn. 

![Alternative Text](/images/blogcontent/cloud-monitoring/60.JPG "Alt text")

Initially, we forgot to setup an iptables rule to allow only us to access the server via SSH. The next day, when we came back to the machine we noticed that the auth.log file located at /var/log/ was over 4MBs! 

![Alternative Text](/images/blogcontent/cloud-monitoring/61.JPG "Alt text")

Look at all the people trying to get into our machine, even so much as 4-5 SSH attempts per second, it’s alarming to see just how noisy and malicious the internet is. We quickly setup an iptables rule to only allow us at Sheridan to access our machine via SSH, all other IPs are dropped.

![Alternative Text](/images/blogcontent/cloud-monitoring/62.JPG "Alt text")

A quick fix, yes- a better rule might have been to accept only the 3 ports we have open and then DROP all others. Either way, this is good enough for us for now. 

### 4. HTML5 Apps

The great thing about RESTful APIs is that they work on any system that is able to talk HTTP. HTTP is truly client-agnostic and we’ve just built an API on HTTP; thus, by transitive property, we’ve built a client-agnostic API set and now we’re able to build the front-end for our app on literally anything. Initially, we were thinking of building a front-end specifically for a Raspberry Pi but we didn’t feel like spending money on one. In the end, we agreed on building something that works on both mobile phones and the browser.

# 4.1 Ionic Platform

Most modern smartphones have a WebView which allows us to write hybrid mobile apps using HTML5 technology like HTML, CSS and JavaScript- the standard languages that are used to build web pages. This is attractive to us because it allows us to write the application once in the same languages rather than having to write mobile apps natively using Java or Swift.

Ionic is an open-source framework that works on top of the WebView API and gives us the ability to access native mobile functionality like swiping and touching the screen through the framework’s API set. This is what we’ve chosen to use.

![Alternative Text](/images/blogcontent/cloud-monitoring/63.JPG "Alt text")

Very succinctly, everything that would normally work in a browser app will work here on the phone as well.

# 4.2 App Implementation

Let’s walk through what we’re able to do with the app. 

# 4.2.1 Login and Dashboard

We can use our login credentials that we created server-side to obtain a JWT token. That token is used as accompaniment for all subsequent requests on the application. 

![Alternative Text](/images/blogcontent/cloud-monitoring/64.JPG "Alt text")

Here, we can see all of our EC2s that we’ve setup in our VPC. It shows the Name, InstanceId, date last launched time and current status of the VM (shown as a green circle if running).

The diagram pictured in the last section shows at a high level how requests are fulfilled. This pattern is followed for each request. Note that the Notification Server knows which AWS SDK Method to invoke based on the METHOD and URL of the HTTP request (again - “the combination of a method and a URL gives meaning to the request”).

![Alternative Text](/images/blogcontent/cloud-monitoring/65.JPG "Alt text")

This next diagram shows the result of what’s received in the Response for the HTTP request. All of this data has been piped back from the Node Server’s function invocation of the corresponding AWS API call for EC2 instances’ status and info.

![Alternative Text](/images/blogcontent/cloud-monitoring/66.JPG "Alt text")

# 4.2.2 Metric Stats

Selecting an Instance will open up a menu showing all available metrics on that particular instance that we can look at the stats for. The stats for all metrics are min, max, average and sum. 

We’ve provided the ability to change the date range to see how these stats change over different periods of time.

![Alternative Text](/images/blogcontent/cloud-monitoring/67.JPG "Alt text")

# 4.2.3 Real-time Logging

The real-time logging is the main feature we’re interested in. The second tab at the bottom of the Screen titled “Logs” takes us to a page showing us all Log Groups.

# 4.2.4 Log Groups

The Log Groups page shows all of the log groups that were created in our topology. We decided to give each machine its own Log Group (with exclusion to the /var/log/messages log group showing system logs from all machines).

![Alternative Text](/images/blogcontent/cloud-monitoring/68.JPG "Alt text")

The data shown here was fulfilled with a request to our web server with the URL of /api/log/groups with the method: GET. The snippet below of the JSON data returned from the request shows just how much information is being passed to the front end before being rendered visualy.

![Alternative Text](/images/blogcontent/cloud-monitoring/69.JPG "Alt text")

# 4.2.5 Log Streams

Clicking on a log group brings us to a list of all the log streams for that log group.

From this page, if we click on a log stream for a log group, let’s say for example, we wanted to see the Log Stream called APPSERVER1-SSH_OUT for the AppServer1 Log Group, we would select the SSH_OUT stream and this would take us to another page where we can actually view the log stream in realtime!

Selecting one of these streams initializes the Client Socket Application by attempting to connect and authenticate itself to the Server Socket process before sending a LOG_STREAM_REQ with the logGroupName (“appserver1” in this case) and the logStreamName (“APPSERVER1-SSH_OUT” in this case)  as the LOG_STREAM_REQ Parameters.

![Alternative Text](/images/blogcontent/cloud-monitoring/70.JPG "Alt text")

# 4.2.6 Real-time Stream

This page displays the logs for the particular (logGroup, logStreamName) tuple in realtime and updates the current logs when new log data is added to CloudWatch.

![Alternative Text](/images/blogcontent/cloud-monitoring/71.JPG "Alt text")

# 4.3 Server Output

Here’s a capture of the server handling REST requests on the mobile app and maintaining a log stream connection. We can deduce exactly how the client is using the app from watching REST calls and our TCP Socket server output.

![Alternative Text](/images/blogcontent/cloud-monitoring/72.JPG "Alt text")

This concludes our research and experiment into building a client-agnostic API set to monitor cloud resources in real time.

### 5. Links and Resources

If you'd like to take a look at the source code for this project, it's scattered across these GitHub repositories:

[Client Application Code (Aws-netmonitor-IonicApp) ](https://github.com/stemmlerjs/aws-netmonitor-ionicapp)
[Movie-Quotes App (Running on EC2s)](https://github.com/stemmlerjs/movie-quotes)
[Notification Server](https://github.com/stemmlerjs/aws-realtime-network-monitor)
[Network Monitoring and IPTables Scripts](https://github.com/stemmlerjs/netmonitor-scripts)


















































