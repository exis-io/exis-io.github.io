## About

Exis is a NaaS (Network as a Service) which consists of the Riffle protocol, Fabric network, and Appliances. Together these standardize networking best practices and simplify the design and implementation of distributed applications. 

[[Riffle|Riffle]] is a tentative fork of the WAMP protocol. It provides message-based communication between any two parties over the Fabric irrespective of language, underlying connection, or platform. It has two notable features: high-level usage and . Developers and applications interact directly with riffle. 

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