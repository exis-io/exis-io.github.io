# Welcome

Exis is built to make networking code simple, painless, and secure. Writing networking code should be as easy as writing local code!


## About

Exis is a NaaS (Network as a Service) which consists of the [Riffle](/pages/riffle/Riffle.md) protocol, [Fabric](/pages/fabric/Fabric.md) network, and [Appliances](/pages/appliances/Appliances.md). Together these standardize networking best practices and simplify the design and implementation of distributed applications. 

[Riffle](/pages/installing/gettingStarted.md) is a tentative fork of the WAMP protocol. It provides message-based communication between parties over the Fabric irrespective of language, underlying connection, or platform. It has two notable features: high-level usage and . Developers and applications interact directly with riffle. 

The [[Fabric|Fabric]] is a collection of running programs called [[Nodes|Node]] that route riffle traffic similar to IP routers. Like riffle, the design of the fabric takes best practices and enforces them implicitly. Riffle requires at least one node to be used in a meaningful way.

[[Appliances|Appliances]] are discrete software services that expose high-level functionality. They can be authored, deployed, and utilized by any developer on the fabric. [[Core Appliances|Appliances]] are used to configure the behavior of the fabric or to enable deployment administration. 

See table of contents to the right. 

## The 10 Rules

Beautiful is better than ugly.

There should be one-- and preferably only one --obvious way to do it.

Give them less [lines of code, complexity, required knowledge].

Security is not a feature. 

Choice of language[s] has no bearing on use.

Be decentralized.

Be scalable. 

Explicit is better than implicit.

Simple is better than complex.

Special cases aren't special enough to break the rules. 


[riffle]:/pages/installing/gettingStarted.md


<!-- [Riffle](/pages/installing/gettingStarted.md
[Resin.io][resin] 

[Resin.io][resin] makes it simple to deploy, update, and maintain code running on remote devices. We are bringing the web development and deployment workflow to hardware. Using tools like git and docker to allow you to seamlessly update all your embedded linux devices in the wild. We handle cross-compilation, device monitoring, VPNs, and log collection, so you can focus on your product and not the infrastructure.

To get started with resin.io, first read [understanding resin.io][understanding] or you can jump right in with [installing resin.io][installing] to start provisioning some devices and pushing code.

Have fun!

If you have any further questions drop us a mail at **hello@resin.io**.

[resin]:http://resin.io
[installing]:/pages/installing/gettingStarted.md
[understanding]:/pages/understanding/understanding-code-deployment.md -->
