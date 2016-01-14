# Fabric Overview

A platform for handling riffle traffic. It connects all [domains][domain] together, exchanging [messages][message] between them.  

Plainly speaking, the fabric gets messages from one place to another.

The fabric is built from [nodes][Node]. They route messages from two [domains:][domain] the sender and the receiver. 

[Appliances][Appliances] are discrete programs that expose some important functionality to developers and users on the fabric. The core appliances together with the routers make up the fabric itself. 


## Node

A Node is a router for [riffle][Riffle] messages. A set of nodes make up the [fabric.][Fabric] Individual nodes accept connections from domains, receive messages, and either deliver messages to their target or to another node for processing. 


#### Meta Level Events

Interested domains need to be notified when certain sessions:

* Connect
* Disconnect 

These actions are different from any other action in that the node emits the corresponding messages, not an application-level domain.

The interested party has to know when an interesting session connects, but should not have to poll all nodes. The node has to differentiate between interesting new sessions and uninteresting new sessions at the time of connection. Nodes can't store the set of all meta-level events across the fabric, since each node has to hold the full state information. Possible solutions:

* Every session meta event is published by its edge node. There is some well known endpoint these publishes arrive (i.e. superdomain)
* The inherent identity of an domain informs the node that the session is interesting or uninteresting and the specific endpoint to publish the meta event on. This is not flexible after deployment. 
* An appliance is responsible for maintaining the status of sessions. It is notified of session connections, tracks their status, and performs some continuous check for tenancy. 
 

#### Startup procedure:

* Bring node up
** args: certificate directory
** args: core 
** args: bootstrap (bool)
* Attach means communicate with core node
* Attach core appliances
* Accept new connections

`Certificate directory` points the node to some identity it should use. Required for bootstrapped nodes. 

`Core` is an agent that the node queries for association and positioning information. This functionality is not yet well defined. `Core` is some well trusted delegate of the owner. 

`Bootstrap` affects the startup behavior of the node. If `true`, the node assumes it is the first entry in a new fabric-- a certificate must be provided. If `false` the node attempts to associate with the passed `core`. 

#### Environment Variables

**EXIS_PERMISSIONS**: Control how the node handles permissions.  By default the node enforces strong permissions through the downward-only rule and exceptions to the rule through bouncer.  Set this variable to "off" to disable permissions checking and allow domains to reach any endpoint.

**EXIS_AUTHENTICATION**: Control how the node handles authentication.  By default the node enforces strong authentication via either tokens or challenge response.  Set this variable to "soft" to enable tiered authentication.  Under this mode, domains can still use tokens or challenge response, but it is not mandatory.


__TOCTAGS__

