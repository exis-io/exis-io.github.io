# Appliances

[*Applicances*][appliances] are like software libraries in a traditional software project. They're small services that solve common problems you can add to your fabric-aware applications. *Applainces* are very similiar to modern day *cloud services*. This means the owner of the fabric runs and manages the software. Developers don't have to know how to run or maintain these complicated services, they just have to understand how to use them.

## The Usual Fare

Exis created and runs a set of commonly used appliances for all developers to integrate with. Any developer can write and offer access to an appliance of their own creation. Each appliance falls into a broad category. These categories don't mean much to the fabric, they're only here to help developers find what they need quickly. [Agents][agents] interact with appliances by sending [messages][message] to [endpoints][endpoint].

* [**Store**][store]: storage of data. Simple versions are just thin wrappers to popular databases, while more advanced versions provide high-level model and distributed abstractions
* [**Core**][core]: core appliances are special appliances that change the way the fabric functions. These include management, authentication, and performance. 
* [**Container**][container]: take some code you'd like to run all the time and push it to the cloud. 
* [**Gateway**][gateway]: connect the web to the fabric in simple ways: serve web pages, translate between web traffic and riffle traffic, and send email, among other things. 

So why do you care, why are appliances useful? Appliances are here to solve problems that many other apps have dealt with before. Saving data, sending emails, storing images-- these features take time to set up and configure, time that isn't spent creating new features. Existing cloud providers and services already offer some of these services. On the fabric, however, interacting with appliances is much easier. 

## Microservices

Microservices are like services, but smaller. 

DALE HALP.

[The last piece of the puzzle: keeping your apps safe from the world and your users.](/pages/tour/Security.md)

<!-- Reference for TOC -->

[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md

[appliances]:/pages/appliances/Appliances.md
[store]:/pages/appliances/Store-Appliances.md
[core]:/pages/appliances/Core-Appliances.md
[container]:/pages/appliances/Container-Appliances.md
[gateway]:/pages/appliances/Gateway-Appliances.md

