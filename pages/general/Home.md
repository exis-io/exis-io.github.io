# Welcome

Exis is built to make networking code simple, painless, and secure. Writing networking code should be as easy as writing local code, and managing deployments should be a breeze!
Please check out our documentation, and follow along with code from our [repos](https://github.com/exis-io).

## Overview

Exis is a combination of three components that make writing next-generation apps as simple as possible. It consists of the [Riffle](/pages/riffle/Riffle.md) protocol, [Fabric](/pages/fabric/Fabric.md) network, and [Appliances](/pages/appliances/Appliances.md). Together these standardize networking best practices and simplify the design and implementation of distributed applications. 

![Exis Overview](/img/exis_docs_overview.svg)

## Why Exis

Networked code is some of the most complicated and error prone code in most applications. It takes up a lot of time, effort, and lines and most people don't do it perfectly-- its hard! You can be an expert with a language on a given platform and make incredible software, but when you decide to take that application to the internet a whole new suite of skills is required. 


1. Data interchange formats: XML, JSON
2. Protocols: HTTP or socket-based communication
3. Networking: IP and DNS addressing
4. Security: secure communication and data storage, authentication
5. API Design: REST, SOAP, and design security
6. Server Design: concurrency, reliability, and scalability  


You could spend a whole career specializing in just one of these topics! As software developers in this day and age, where software design and tools are more and more powerful, where we're expected to be experts in multiple fields all the time, how can we write better network code? The better question is actually __why do we keep writing networking code__?

<!-- ## The Solution

Fundamentally networking code is method calling. You as a user write code for you application that wants to execute code that lives somewhere else- all the complexity and knowledge involved in writing modern network code simply enables this process. This is our first key observation. The second is that a global and universal method for writing all networking code requires some conventions-- it is some consistent set of rules that all developers can follow. The final useful insight is that modern applications are built out of reusable, distributed services that are spread all around the Internet.

In order to make this happen we use three broad categories of software, the **Fabric** platform, the **Riffle** protocol, and **Appliance** services. 

In this tour will cover a 30,000 feet overview of the Exis offering. You'll understand why we don't want to make network code beautiful-- we want to stop writing it entirely. Each section of the tour you'll find links to the specification of each components and at the end you can scope out our samples. Don't worry about the specifications for now, they're a little more in-depth. 

[First, let's look at traditional distributed applications](/pages/tour/OldSchool.md) -->


<!-- [Riffle](/pages/installing/gettingStarted.md) is a tentative fork of the WAMP protocol.
It provides message-based communication between parties over the Fabric irrespective of language, underlying connection, or platform.
Developers and applications interact directly with riffle libraries in each language. 
Riffle has two notable features: 1) abstraction of complex networking functionality and 2) the ability to serialize objects to maintain the look and feel of native function calls.

The [Fabric](/pages/fabric/Fabric.md) is a collection of running programs called [Nodes](/pages/fabric/Node.md) that route riffle traffic similar to IP routers.
Like riffle, the design of the fabric takes best practices and enforces them implicitly.
Exis requires at least one node in order for it to function in a meaningful way.

[Appliances](/pages/appliances/Appliances.md) are discrete software services that expose high-level functionality. They can be authored, deployed, and utilized by any developer on the fabric. [Core Appliances](/pages/appliances/Core.md) are used to configure the behavior of the fabric or to enable deployment administration.  -->


## The 10 Rules

1. Beautiful is better than ugly.

2. There should be one-- and preferably only one --obvious way to do it.

3. Require less [lines of code, complexity, required knowledge].

4. Security is not a feature. 

5. Choice of language doesn't affect functionality.

6. Be decentralized.

7. Be scalable. 

8. Explicit is better than implicit.

9. Simple is better than complex.

10. Special cases aren't special enough to break the rules. 


[riffle]:/pages/installing/gettingStarted.md

