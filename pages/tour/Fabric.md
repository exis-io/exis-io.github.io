# Fabric

The [fabric][fabric] is a platform for handling riffle traffic. It connects all [agents][agent] together, exchanging [messages][message] between them. Unlike the internet, only approved traffic is accepted. 

## The Node

[*Nodes*][node] make up most of the fabric. They are pieces of software that coordinate between all agents and enforce the rules of the fabric. You don't have to worry about nodes too much unless you're going to develop core infrastructure. Just know that at the end of the day, nodes do the heavy lifting for you.

All agents connect to a node when they begin interacting with the fabric. While we don't want to keep using internet terminology and protocols, this is the only place where a URL is required. There's always at least one node at ```node.exis.io```.

## Domains

The most important part of working with the fabric is understanding where things are and how to reach them. Remember that each piece of software, each application that communicates over the fabric is called an [agent][agent]. Each of those agents has a [*domain*][domain], or a name that anyone can use to find that agent. 

Here are some quick and simple rules for dealing with domains:

* Each domain is unique
* Each domain refers to an agent on the fabric
* A domain can belong to another domain. The owner is called a *superdomain* and the owned is called a *subdomain.*
* Domains are seperated from their subdomains with a dot
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

If domains describe where agents (and thus applications) live, then [*actions*][actions] let you name different kinds of methods that a domain can receive. Actions are separated by a forward slash (`/`) and always begin with one. 

## People, Names, and Places

 

Domains
Actions
Endpoints
Agents

[Onto Appliances!](/pages/tour/Appliances.md)

<!-- Reference for TOC -->

[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md