A Node is a router for [[riffle|Riffle]] traffic. A set of nodes make up the [[fabric.|Fabric]] Individual nodes accept connections from agents, receive messages, and either deliver messages to their target or to another node for processing. 

Routes [[messages|Message]] along the fabric towards their intended target, holds message pattern state, authenticates new [[agents|Agent]], and checks authorization credentials for messages. 

Note: a *node* is different than a *router*. In our definitions the latter refers to  *Paradrop Router*, a physical hardware platform. 

### Requirements

Nodes accept riffle traffic and either deliver it to its destination or forward it to another node. 

Nodes perform authentication and authorization. 

Each node has an internal agent. This agent can be the source and destination of messages, but these endpoints are generally exposed to the owner of the fabric.

Can eject tenants. 

Perform traffic monitoring and rate limiting. 

Hold message pattern state (registrations, subscriptions) which is stored at the edge node for a tenant. 

> V2

Nodes may begin in two states: *provisioned* or *unprovisioned*. A node becomes provisioned when it receives a certificate. 

#### Meta Level Events

*Story: Stateful container*
> 1. Developer creates peer to peer and peer to container application
> 2. Developer creates stateful backend container 
> 3. User uses application to connect to container
> 4. Container registers ongoing state of user application
> 5. Container is notified when application session disconnects

Interested agents need to be notified when certain sessions:

* Connect
* Disconnect 

These actions are different from any other action in that the node emits the corresponding messages, not an application-level agent.

The interested party has to know when an interesting session connects, but should not have to poll all nodes. The node has to differentiate between interesting new sessions and uninteresting new sessions at the time of connection. Nodes can't store the set of all meta-level events across the fabric, since each node has to hold the full state information. Possible solutions:

* Every session meta event is published by its edge node. There is some well known endpoint these publishes arrive (i.e. superdomain)
* The inherent identity of an agent informs the node that the session is interesting or uninteresting and the specific endpoint to publish the meta event on. This is not flexible after deployment. 
* An appliance is responsible for maintaining the status of sessions. It is notified of session connections, tracks their status, and performs some continuous check for tenancy. 

### Specifications

#### Meta Level Events

 

##### Startup

1. Accept a certificate providing identity 
2. Connect to some known source node, receive connection assignment
3. Connect to core appliances
4. Open ws server and serve

#### Environment Variables

**EXIS_PERMISSIONS**: Control how the node handles permissions.  By default the node enforces strong permissions through the downward-only rule and exceptions to the rule through bouncer.  Set this variable to "off" to disable permissions checking and allow agents to reach any endpoint.

**EXIS_AUTHENTICATION**: Control how the node handles authentication.  By default the node enforces strong authentication via either tokens or challenge response.  Set this variable to "soft" to enable tiered authentication.  Under this mode, agents can still use tokens or challenge response, but it is not mandatory.
