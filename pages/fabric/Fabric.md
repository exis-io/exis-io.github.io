# Fabric

A collection of nodes and core appliances that is tasked with routing and delivering messages from one [agent][Agent] to another. 

The fabric is an overlay network atop TCP/IP that runs Riffle over Websockets. 

The rough network stack:

* Application 
* Riffle
* Websockets
* TCP/TLS
* IP

[Nodes][Node] are routers for [riffle][Riffle] traffic. They route [messages][Message] from two [agents:][Agent] the sender and the receiver. 

[Appliances][Appliances] are discrete programs that expose some important functionality to developers and users on the fabric. The core appliances together with the routers make up the fabric itself. 

## Requirements

Malicious traffic is not served the fabric. 

Fabric should be highly tolerant to fragmentation. 

Functionality and customizability is moved to appliances and owners where possible. 


<!-- Reference for TOC -->

[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
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
