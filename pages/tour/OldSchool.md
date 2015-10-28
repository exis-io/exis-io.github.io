# Traditional Networking Architectures

Before we dive into all the ways Exis makes the world a better place, let's take a look at the current state of affairs. A vast majority of mobile apps written today rely on remote servers, either created by the developer of the application or produced by third parties. Web pages used to be delivered by a server once at a time but now frequently phone home. Desktop software may communicate with the rest of the world less frequently than the first two categories but still has to deal with the problems detailed here.

## Basic Communication

When programs around the world talk to each other they generally use `TCP` and `HTTP`. These two categories of communication can also be called _internet traffic_ and  _web traffic_. All web traffic is internet traffic, but not all internet traffic is web traffic. 

__Note:__ When computers communicate with each other, there needs to be a common set of rules and instructions that each computer follows. A specific set of communication rules is called a protocol. Because of the many ways computers can communicate with each other, there are many different protocols -- too many for the average person to remember. [techterms.com](http://techterms.com/definition/protocol)

So whats wrong with them? Clearly the world runs just fine over the internet, right? Sort of. You can get things done over the Web and/or the internet, but each type of communication has some shortcomings. 

* HTTP doesn't deal with *push based* and *bidirectional communication* very well. Applications have to ask a server for information, the server can't provide it as needed. This is part of the *client-server model.*
*  TCP is advanced and requires a solid understanding of advanced issues: asynchronous programming, concurrency, and bit-stream protocols. 
*  Web apps can't use TCP directly

## Passing Data
Protocols let us move data around but we still need to tell it where to go, how to package it, and make sure it gets there in one piece. Respectively, these problems are called *addressing*, *serialization*, *validation*.

Addressing uses the domain name system, or `DNS`. This system maps names to Internet protocol addresses. As a developer you have to know what Internet address to point your protocols at, like pointing a hose at a target. Each address represents a computer or server, and while the system is intuitive its not easily readable by humans.

```
Domain Name: Google.com
IP Address: 4.4.4.4
```

Serialization is the process by which information from one application is transmitted to another application. Generally applications rely on well known in agreed-upon formats for serialization. For web traffic the format is ususally `JSON` or `XML`. TCP traffic is a little trickier-- usually the developer has to set up their own system for transferring data.

__Note:__ serialization is the process of converting a data structure or object into a well known format so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be "resurrected" later in the same or another computer environment. [wikipedia.org](http://en.wikipedia.org/wiki/Serialization)

Finally, validation lets developer know the data they receive is the data they want to receive. When a programmer writes a chunk of code he or she can be reasonably certain it will play nicely with their other code. Assumption doesn't hold on the Internet-- you always have to make sure the data you recieve hasn't been changed.

## Security

The internet is a scary place! It's a complex and wide world where malicious actors are always on the prowl for unprotected software. If this sounds scary, it should! From spying governments to hackers to plain old misbehaving users, every application is one step away from disaster. Protecting against disaster is hard: *the bad guys only have to get lucky once*. This is the most complicated part of networking.

*Authentication* is the process of determining whether someone is in fact who they say they are. At first all authentication was based around usernames, emails, and passwords. Now however we know this is not a good way to determine identity. The systems for protecting this information and the ways in which uses choose passwords make it very easy for bad people to pretend to be you online. Many modern applications lean on a solid authentication system.

*Authorization* is the process of giving someone permission to do or have something. Your bank for example gives you the authorization to view your account balances. It's very important that your neighbor is not authorized to view your account. Authorization often goes hand-in-hand with authentication.

__Note:__Encryption is the process of converting data to an unrecognizable or "encrypted" form. It is commonly used to protect sensitive information so that only authorized parties can view it. This includes files and storage devices, as well as data transferred over wireless networks and the Internet. [techterms.com](http://techterms.com/definition/encryption)

Encryption is the final and very broad category of security. Although authentication and authorization rely on encryption, here we're talking about the ways in which applications protect their communications from prying eyes. Here are the three most common attacks a developer had to protect against:

1. Eavesdroppers- dont want anyone to be able to listen in on data while its in the internet
2. Compromised Services- if some service like Gmail is hacked, user information should be protected
3. Malicious Services- users should be able to use a service without having to trust the owners of that service

These problems are tackled through the `TLS` protocol, at-rest encryption, and end-to-end encryption. 

## Servers

The last skillset your modern programmer needs is the ability to write servers. Servers are special programs that are very good at communicating with lots of other programs. Specifically, websites and mobile applications that have thousands or millions of versions in the world generally communicate with only a couple servers. Servers are separate from the application and the people who write them have to know how to write code in a very different way.

As if that weren't enough, the languages mobile and desktop applications use can be wildly different for web servers. In other words, a developer or studio usually cant apply the same language to both applications and servers. Instead, they must either switch between two or more languages or recruit someone who is proficient in another language.s

## The Laundry List

Well, thats quite a list. 

Topics mentioned above are not fully described here. Most of these fields have specialists that **only** do that one thing! For single developers or even organizations, the amount of knowledge required to make connected applications is as large as the chance of error.

[Its time to check out riffle.](/pages/tour/Riffle.md)
