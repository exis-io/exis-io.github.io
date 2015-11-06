# Welcome

Exis is built to make networking code simple, painless, and secure. Writing networking code should be as easy as writing local code!
Please check out our documentation, and follow along with code from our [repos](https://github.com/exis-io).

Want to learn about Exis quickly? Run through the [Tour.](/pages/tour/Tour.md)

Check out the [**iOS Cards Against Humanity Tutorial!**](/pages/samples/SwiftCardsTutorial.md)

## Overview

Exis is a combination of three components that make writing next-generation apps as simple as possible. It consists of the [Riffle](/pages/riffle/Riffle.md) protocol, [Fabric](/pages/fabric/Fabric.md) network, and [Appliances](/pages/appliances/Appliances.md). Together these standardize networking best practices and simplify the design and implementation of distributed applications. 

![Exis Overview](/img/exis_docs_overview.svg)

[Riffle](/pages/installing/gettingStarted.md) is a tentative fork of the WAMP protocol.
It provides message-based communication between parties over the Fabric irrespective of language, underlying connection, or platform.
Developers and applications interact directly with riffle libraries in each language. 
Riffle has two notable features: 1) abstraction of complex networking functionality and 2) the ability to serialize objects to maintain the look and feel of native function calls.

The [Fabric](/pages/fabric/Fabric.md) is a collection of running programs called [Nodes](/pages/fabric/Node.md) that route riffle traffic similar to IP routers.
Like riffle, the design of the fabric takes best practices and enforces them implicitly.
Exis requires at least one node in order for it to function in a meaningful way.

[Appliances](/pages/appliances/Appliances.md) are discrete software services that expose high-level functionality. They can be authored, deployed, and utilized by any developer on the fabric. [Core Appliances](/pages/appliances/Core.md) are used to configure the behavior of the fabric or to enable deployment administration. 


## The 10 Rules

1. Beautiful is better than ugly.

2. There should be one-- and preferably only one --obvious way to do it.

3. Give them less [lines of code, complexity, required knowledge].

4. Security is not a feature. 

5. Choice of language(s) has no bearing on use.

6. Be decentralized.

7. Be scalable. 

8. Explicit is better than implicit.

9. Simple is better than complex.

10. Special cases aren't special enough to break the rules. 


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
