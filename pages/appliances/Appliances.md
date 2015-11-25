A generic software component developed by any individual or group. Accessible as a service through common [messaging patterns][Message] to developers creating applications that use exis. 

Appliances have to be [injected][Injection] to a developer's [domain][Domain]. The developer does not gain access to the code of the underlying appliance. Each appliance has specific publicized endpoints that developers may used to interact with the appliance. 

Appliances are categorized by their broad purpose and their level-- perceived complexity, security, or utility. Levels range from 1 to 3. The level of an application is indicated with parenthesis following the name of the appliance. 

While useful as a tool for organization, an appliance's level may also imply some restriction or different behavior upon the owning domain. For example *Auth (3)* is more secure than *Auth (1)*-- some components of the fabric may behave differently when interacting with the more secure domain. 


## Requirements

An appliance should belong to the developer using it without giving that developer control of the appliance itself. Similarly, the creator of the appliance should not be able to access the developer's data in the appliance. 

Creators of an appliance should be able to charge for usage using a predetermined payment structure. The creators should not have to implement the payment scheme themselves. 

Developers should be able to add appliances to their domain.


# Appliances

[*Applicances*][appliances] are like software libraries in a traditional software project. They're small services that solve common problems you can add to your fabric-aware applications. *Appliances* are very similiar to modern day *cloud services*. This means the owner of the fabric runs and manages the appliance software. Developers don't have to know how to run or maintain these complicated services, they just have to understand how to use them.

## The Usual Fare

Exis created and runs a set of commonly used appliances for all developers to integrate in their applications. Any developer can write and offer access to an appliance of their own creation. Each appliance falls into a broad category. These categories don't mean much to the fabric, they're only here to help developers find what they need quickly. When a developer attaches a new appliance to their application, a set of well known endpoints are added to the application's domain, in this way [agents][agent] interact with appliances by sending [messages][message] to [endpoints][endpoint].

For example, a logging appliance might collect usage stats and errors that occur within applications, in this case when a user adds the `logging` appliance, they might see the following endpoints added automatically to their application:

```
xs.joebob.thenextfacebook.log/usage - save data about how users interact with your app
xs.joebob.thenextfacebook.log/error - save errors or exceptions that app users see
```

* [**Store**][store]: storage of data. Simple versions are just thin wrappers to popular databases, while more advanced versions provide high-level model and distributed abstractions
* [**Core**][core]: core appliances are special appliances that change the way the fabric functions. These include management, authentication, and performance. 
* [**Container**][container]: take some code you'd like to run all the time and push it to the cloud. 
* [**Gateway**][gateway]: connect the web to the fabric in simple ways: serve web pages, translate between web traffic and riffle traffic, and send email, among other things. 

So why do you care, why are appliances useful? Appliances are here to solve problems that many other apps have dealt with before. Saving data, sending emails, storing images, user registration/authentication-- these features take time to set up and configure, time that isn't spent creating new features. Existing cloud providers and services already offer some of these services. On the fabric, however, interacting with appliances is much easier. 



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



<!-- Reference for TOC -->

[Message]:/pages/riffle/Message.md
[Injection]:/pages/appliances/Injection.md
[Domain]:/pages/riffle/Domain.md
