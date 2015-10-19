A collection of nodes and core appliances that is tasked with routing and delivering messages from one [[agent|Agent]] to another. 

The fabric is an overlay network atop TCP/IP that runs Riffle over Websockets. 

The rough network stack:

* Application 
* Riffle
* Websockets
* TCP/TLS
* IP

[[Nodes|Node]] are routers for [[riffle|Riffle]] traffic. They route [[messages|Message]] from two [[agents:|Agent]] the sender and the receiver. 

[[Appliances|Appliances]] are discrete programs that expose some important functionality to developers and users on the fabric. The core appliances together with the routers make up the fabric itself. 

## Requirements

Malicious traffic is not served the fabric. 

Fabric should be highly tolerant to fragmentation. 

Functionality and customizability is moved to appliances and owners where possible. 