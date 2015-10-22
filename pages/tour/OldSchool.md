# Traditional Networking Architectures

Before we dive into all the ways Exis makes the world a better place, lets take a look at the current state of affairs. A vast majority of mobile apps written today rely on remote servers, either created by the developer of the application or produced by third parties. Web pages used to be delivered by a server once at a time but now frequently phone home. Desktop software may communicate with the rest of the world less frequently than the first two categories but still has to deal with the problems detailed here.

## Basic Communication

When programs around the world talk to each other they generally use `TCP` and `HTTP`. These two categories of communication can also be called _internet traffic_ and  _web traffic_. All web traffic is internet traffic, but not all internet traffic is web traffic. 

__Note:__ When computers communicate with each other, there needs to be a common set of rules and instructions that each computer follows. A specific set of communication rules is called a protocol. Because of the many ways computers can communicate with each other, there are many different protocols -- too many for the average person to remember. [techterms.com](http://techterms.com/definition/protocol)

So whats wrong with them? Clearly the world runs just fine over the internet, right? Sort of. You can get things done over the Web and/or the internet, but each type of communication has some shortcomings. 

* HTTP doesn't deal with *push based* and *bidirectional communication* very well. Applications have to ask a server for information, the server can't provide it as needed. This is part of the *client-server model.*
*  TCP is advanced and requires a solid understanding of advanced issues: asynchronous programming, concurrency, and bit-stream protocols. 
*  Web apps can't use TCP directly

## Passing Data

With protocols we can get data from one place to another, but most data is not ready to be transmitted without a little work. We also have to make sure the data gets to where its going in one piece, not to mention telling the internet where it should go! Respectively, these problems are called *serialization*, *validation*, and *addressing*.

Protocols largely describe how to get information from one piece of software to another, but most data is not ready for transmission without some work. 

*  Both types of communication rely on `DNS` and `IP`, or the address book of the internet. These systems move information around on the internet, but they're not easily readable to humans.  

Addressing
Serialization
Validation

## Security

Encrypted channels
End to End
Authentication
Authorization

## Servers

Modern servers, 1st party
Modern containers

[Next, lets check out riffle.](/pages/tour/Riffle.md)