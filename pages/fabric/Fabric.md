# Fabric

A platform for handling riffle traffic. It connects all [domains][domain] together, exchanging [messages][message] between them.  

Plainly speaking, the fabric gets messages from one place to another.

The fabric is built from [nodes][Node]. They route messages from two [domains:][domain] the sender and the receiver. 

[Appliances][Appliances] are discrete programs that expose some important functionality to developers and users on the fabric. The core appliances together with the routers make up the fabric itself. 

## General

### The Node

[*Nodes*][node] make up most of the fabric. They are pieces of software that coordinate between all domains and enforce the rules of the fabric. You don't have to worry about nodes too much unless you're going to develop core infrastructure. Just know that at the end of the day, nodes do the heavy lifting for you.

All domains connect to a node when they begin interacting with the fabric. There's always at least one node at ```node.exis.io```.

### Domains

The most important part of working with the fabric is understanding where things are and how to reach them. Remember that each piece of software, each application that communicates over the fabric is called an [domain][domain]. Each of those domains has a [*domain*][domain], or a name that anyone can use to find that domain. 

Here are some quick and simple rules for dealing with domains:

* Each domain is unique
* Each domain refers to an domain on the fabric
* A domain can belong to another domain. The owner is called a *superdomain* and the owned is called a *subdomain.*
* Domains are separated from their subdomains with a dot
* The top level domain is the owner of the fabric
* A domain owns and generally has control over everything in their subdomains

The top level domain is special. Since the node software is open source, anyone can run their own fabric. The top level domain is the name of the owner of the fabric, usually shortened to two letters. We, as Exis, run a primary version of the fabric. The top level domain is:

```
xs
```

If you decide to sign up as a user named *joebob* you get the subdomain:

```
xs.joebob
```

Go ahead and create a new app *thenextfacebook* and you'll get the name:

```
xs.joebob.thenextfacebook
```

## Actions

If domains are the names of domains, then [*actions*](/pages/riffle/Action.md) are what they can do. You can think of domains as nouns and actions as verbs. An action always begins with a forward slash. Actions can have subactions similar to subdomains but without the concept of ownership. Subactions are separated by a forward slash (`/`). 

A basic action: 

```
/hello
```

One subaction:

```none
/hello/there
```

## Endpoints

The last piece of the puzzle not mentioned above is the [*endpoint*][endpoint].
Endpoints aren't anything special, just a domain with an action together: a verb with a noun. 

Remember `thenextfacebook` app our user `joebob` made? Lets combine it with the basic action from the section above:

```
xs.joebob.thenextfacebook/hello
```

Any domain on the fabric can send a message to this endpoint (as long as they have the proper permissions). Exis will route the message to the app `thenextfacebook`. The method called within the app for this endpoint depends specifically on the application.



<!-- Reference for TOC -->

[message]:/pages/riffle/Message.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md
[Riffle]:/pages/riffle/Riffle.md

[appliances]:/pages/appliances/Appliances.md
[store]:/pages/appliances/Store-Appliances.md
[core]:/pages/appliances/Core-Appliances.md
[container]:/pages/appliances/Container-Appliances.md
[gateway]:/pages/appliances/Gateway-Appliances.md
