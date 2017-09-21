---
title: Asterisk PBX Text Notifications Using Node.JS and Twilio
date: 2017-09-21 13:07:04
tags: [asterisk, cisco, experiment, javascript, tutorial, nodejs, networking]
---

Asterisk is an open source framework for building communications applications. Run on Linux, it can be used to set up a PBX (Private Branch Exchange), VoIP conference calls or even to connect to the PSTN– the legacy telephony system we all know and use today! That doesn’t even scratch the tip of the iceberg with things you can do with Asterisk. I was recently exposed to Asterisk in my Public Carrier Systems class. As a final project for the class, I decided it would be cool to set up a system that works with Asterisk to notify a VoIP user of a missed call via SMS. To do this, we’ll use Node.js to detect a missed call to our VoIP phone through the Asterisk Server and use Twilio to send an SMS to our mobile phone notifying us of the missed call and the calling extension address.

You can visit the code on Github here at https://github.com/stemmlerjs/Asterisk-Twilio

How we’ll do it

Topology Setup
Asterisk Manager Interface configuration to allow our Node.js script to listen for events over TCP.
Configure Demo User Agents in sip.conf.
Configure Dial Plan in extensions.conf.
Setup Twilio Account.
Setup Node.js HTTP Server and Notifications Server
Run and Test
Topology

The topology shown in Figure 1 is comprised of 2 VoIP clients (a Windows 8 machine and an Ubuntu Machine) each configured with their own respective softphone software, one Cisco c7200 Router  allowing internet access through NATed interface and a CentOS machine running the Asterisk PBX and our Node Notification Server code.

We will see later in our configuration that the VoIP client khalil is registered on the Windows 8 machine and the VoIP client asia is registered on the Ubuntu Desktop machine.

topology
Figure 1 – Asterisk-Twilio topology. The CentOS machine is our PBX and Node Notification Server.
Asterisk Management Interface Configuration

The Asterisk Management Interface allows a client program to connect to an Asterisk instance and issue commands or read events over a TCP stream. To get setup will need to configure a user, enable the AMI and bind it to a port on our local machine. Figure 2 shows our configuration in the manager.conf file found in /etc/asterisk .

Figure 2 – manager.conf configuration. Bind the management interface to a port on the local machine and declare a user “hello” with password “world”.
Figure 2 – manager.conf configuration. Bind the management interface to a port on the local machine and declare a user “hello” with password “world”.
If we reload our Asterisk Server and enter the CLI, running the command manager show users shows us all of the users registered as management on the AMI. Notice that in Figure 3, the username=hello shows up (I have 2 other users configured as well but it is expected you will only have one).

show-manager
Figure 3 – All management users shown via asterisk console.
Now that we have the AMI running on this machine via port 5038, let’s test and make sure that we can actually access the Management Interface. To test, we can telnet into it.

Figure 4 – Telnet into the AMI with username=hello, secret=world
Figure 4 – Telnet into the AMI with username=hello, secret=world
Great, it works! We’re able to log into the AMI with these credentials so we will use this later on when we want to access the AMI from our Node application code.

Configure Demo User Agents in sip.conf

Let’s take a quick look at our sip.conf to configure our User Agents, notably my User Agent that we will be monitoring for missed calls ([khalil]). In Figure 5, we can see that we’ve configured a sip channel for ourselves identified by [khalil]; also note the sip channel [asia] which will be used to test our missed call code because [asia] will place a call and then hang up before [khalil] has a chance to pick up (a missed call).

Figure 5 – sip.conf channel configurations for khalil and asia channels.
Figure 5 – sip.conf channel configurations for khalil and asia channels.
Configure Dial Plan in extensions.conf

Both of the channels we configured in sip.conf are placed in the phones context which will be used in extensions.conf. Figure 5 shows the phones context defined extensions.conf. Therefore, when khalil is dialed, a SIP URI for SIP:khalil@192.168.1.1 will be dialed and vice versa for when asia is dialed.

Figure 5 – extensions.conf, basic call handling for khalil and asia extensions. Only the top 2 are required. The last two play some dope tunes.
Figure 6 – extensions.conf, basic call handling for khalil and asia extensions. Only the top 2 are required. The last two play some dope tunes in shimmering gsm quality.
That should pretty much do it! Now we’re ready to get setup with Twilio.

Setup Twilio Account

Twilio provides a variety of different services spanning video, voice, authentication, etc but we will only be using their SMS services today. Luckily for us, when we sign up, we can test Twilio’s SMS services without having to purchase a premium account (this will do for the duration of our demo).

When you log into Twilio, after being given a provisioned phone number you will want to head over to the Programmable SMS section of the site (Figure 7).

Figure 7 – Twilio.com – Getting started with Programmable SMS. We want to use their API Explorer.
Figure 7 – Twilio.com – Getting started with Programmable SMS. We want to use their API Explorer.
If we check out Twilio’s API Explorer, we can see the available API endpoints that are available to us from Twilio to access via standard REST API calls. For example, we will be making POST requests to /Messages (Figure 7) which will allow us to send a new outgoing message to a mobile number.

Figure 8 – HTTP POST to /Messages via Twilio’s API allows us to send a new outgoing message to a mobile number.
Figure 8 – HTTP POST to /Messages via Twilio’s API allows us to send a new outgoing message to a mobile number.
In our POST request however, there are some parameters we must include in order to authenticate and complete the request. Figure 8 shows the format and even the generated Node.js code via the API explorer.

Figure 9 – Twilio API explorer showing the different supported frameworks to access their API through different languages and methods.
Figure 9 – Twilio API explorer showing the different supported frameworks to access their API through different languages and methods.
Now that we know how to use their API, we can write the code to connect to Asterisk from Node.js and use Twilio to emit an SMS message.

Setup Node.JS HTTP Server and Notifications Server

To get this application to work, we will be using a community built module of code called asterisk-ami written by @DanJenkins on GitHub (https://github.com/holidayextras/node-asterisk-ami) to communicate with the AMI (Asterisk Management Interface).

Using Node.JS, ExpressJS and EJS templates, we wrote up a really quick HTTP server that allows the user to go on and configure their SMS settings for their extension via a web gui found at the IP Address of the Asterisk Server at port 8080 (Figure 9). This was done so that we didn’t have to hard-code our mobile phone and extension name. We save all the configuration in a JSON file. Here’s the front-end portion.


 // ========================================================= //
 // ============ Configure Express HTTP Server ============== //
 // ========================================================= //

 var app = express();

 app.listen(8080);
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 app.set('view engine', 'ejs');
 
 app.get('/', function(req,res){
   // Render our template with variables persisted from our json file
   res.render('index', {
     name: config.user.name,
     exten: config.user.exten,
     mobile: config.user.mobile
   });
 });

 app.post('/settings', function(req, res){
   // update settings
   config.user.name = req.body.name;
   config.user.exten = req.body.exten;
   config.user.mobile = req.body.mobile;

   console.log("Updating Settings...".yellow);

   jsonfile.writeFile('./config.json', config, function (err) {
   console.error(err)
 });

 // return to page
 res.render('index', {
     name: config.user.name,
     exten: config.user.exten,
     mobile: config.user.mobile
   });
 });
Nothing really fancy here.

Figure 10 – Web configuration console to set user SMS settings.
Figure 10 – Web configuration console to set user SMS settings.
The most important part of the application code is the portion that detects a missed call. Figure 10 shows the processing of data through Node.js that is received via the AMI console when events occur.

The notification server application logic can be summarized into 1 of 3 states:

1) AWAITING_CALL_STATE
2) INCOMING_CALL_STATE
3) IN_CALL_STATE

During state #2 (INCOMING_CALL_STATE), if we detect that the call was missed (ie: doesn’t transition directly into the 3rd state (IN_CALL_STATE)), then we know that a call was missed– thus, we must send a notification.

Lets take a look at the Notification Server Application Logic; by modular design, this section is just responsible for watching for the missed call event and passes off the callerid, callername and extension of the caller to the sendNotification() method.


// ========================================================= //
 // =============== Asterisk Call Processing ================ //
 // ========================================================= //

 var incomingCallState = false;

 ami.on('ami_data', function(eventData){
 // Every time an event happens once we are logged in, it will be logged into the console here as 'eventData'
 // What we want to do is look for certain events, such as a 'missedCall' event

 var eventName = eventData.event;
 var channel = eventData.channel;
 var callerid = eventData.calleridnum;
 var callername = eventData.calleridname;
 var exten = eventData.exten; 

 if(eventName) console.log("Event : ".green + eventName);
 if(channel) console.log("Channel : " + channel);
 if(callerid) console.log("CallerId : " + callerid);
 if(callername) console.log("CallerName : ".yellow + callername);
 if(exten) console.log("Exten : ".blue + exten);

 if(exten) console.log(""); //space out all of the SIP and RTP data 

 if((incomingCallState) && (eventName == 'BridgeCreate')){
   incomingCallState = false;
   console.log("STATE CHANGE: IN CALL".red);
 }

 if((incomingCallState) && (eventName == 'HangupRequest') && (callerid != config.user.exten)){
   console.log("SENDING NOTIFICATION".red);
   // !! Here is where we send out the notification !!
   sendNotification(callerid, callername, exten);
   incomingCallState = false;
   console.log("STATE CHANGE: Awaiting calls".red);
 }

 if((eventName == 'DialBegin') && (callerid != config.user.exten)){
   //A call is coming in, enter the Incoming Call state
   console.log("STATE CHANGE: INCOMING CALL STATE".red);
   console.log("");
   incomingCallState = true;
 }
 });

 ami.connect(function(){
   console.log('connection to AMI socket successful');

 }, function(raw_data){
 });
The last important part of the code is the portion that actually sends the notification, the sendNotification method!


 // ========================================================= //
 // =============== Send Twilio Notification ================ //
 // ========================================================= //

 /**
  * Sends a notification to the mobile phone configured in config.json via Twilio's provisioned phone (requires a Twilio account).
  * @param {String} caller_id - the caller id of the missed caller
  * @param {String} caller_name - the display name of the missed caller
  * @param {String} extension - monitored user extension from config.json
  * @return void
  */

 var sendNotification = function(caller_id, caller_name, extension){
   twilio.sendMessage({
     to: config.user.mobile,
     from: config.twilio.phone,
     body: "Asterisk Notification: Hi " + config.user.name + ", you've missed a call from " + caller_id 
 + " on your Extension - " + extension + "."
   }, function(err, message){
     if(err) console.log("There was an error", err);
     else {
       console.log("The notification was successfully sent".green);
       console.log("Date Sent: ".green + message.date_created);
     }
   });
 };
Run and Test

Now that everything is all setup, let’s run through and test the application.

After starting up Asterisk and our softphones on each of our machines in the topology, we start up the Node Notification Server with node server.js where server.js is the name of our server script.

Figure 12 – Starting our Node.js Server. We print some of the AMI console events that were received from Asterisk out to the console window.
Figure 11 – Starting our Node.js Server. We print some of the AMI console events that were received from Asterisk out to the console window.
Since we are monitoring the extension [khalil], we will do the following:
– initiate a call from asia to khalil
– end the call from asia before khalil can pick up
– this should trigger a notification to be sent to Khalil’s mobile phone

Figure 12 shows detailed events being logged to the console as khalil receives a call from asia. Notice that after the hangupRequest is issued from asia’s channel, we see that the console logs SENDING NOTIFICATION.

Figure 12 – Console logging on call received, missed and notification sent.
Figure 12 – Console logging on call received, missed and notification sent.
And then…

Figure 13 – Notification that the SMS was successfully sent
Figure 13 – Notification that the SMS was successfully sent
And finally, a screencap from my Android phone!

Figure 14 - Notification received on my Android phone.
Figure 14 – Notification received on my Android phone.
There it is! That’s one way to use the power of Node.js to access Asterisk’s detailed logging system through the AMI and perform a useful service based on AMI data.