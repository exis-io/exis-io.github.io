# Riffle

<sub>*A riffle is a short, relatively shallow and coarse-bedded length of stream over which the stream flows at slower velocity but a higher turbulence than it normally does in comparison to a pool.*</sub>

Riffle is the protocol all [domains][domain] use to communicate with one another. Every program adds riffle code, or the *client libraries*, to their projects. It runs atop [websockets](http://www.html5rocks.com/en/tutorials/websockets/basics/). 

## General

Riffle is a protocol and client-side library that makes network code look like any other local code.

Its the primary way developers interact with the Fabric. Riffle helps move your data around, the fabric actually does the moving. As much as possible, it strives to reduce all networking code down to one line: something that looks much like a method call. A developer shouldn't have to deal with redundant code, code they may not understand, or complex protocols. Of course, none of this is bought at the expense of complexity! Under the hood, all the same kinds of code are running and handling the gritty details.

Riffle provides an interface for interacting with all software on the [fabric][fabric]. Its here to make your life easier by making conventions and common practices rock solid. Riffle handles the following:

1. Type guarantees
2. Serialization
3. Connection Management
4. Authentication
5. Addressing

## Cumin

Cumin is our way of helping to remove boilerplate code from view. Essentially we provide this by providing the enforcement of types that your functions expect to receive.

### Receiving data:
<exis-code name="Want Definitions Recv" action="defs"></exis-code>

### Sending data:
<exis-code name="Want Definitions Send" action="defs"></exis-code>

### Working with objects
<exis-code name="Want Definitions Models" action="defs"></exis-code>

[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md
[samples]:/pages/samples/Samples.md

[auth]:/pages/appliances/Auth-Appliance.md

[perm]:/pages/security/Permission.md
