# Security Flows

A *flow* is the set of actions or events that occur between multiple parties in order to achieve some result. The security flows all result in some change in global security status, either identity or permissions. 

Each flow should be protected against eavesdropping, replay attacks, and malicious parties. 

While flows below refer to "Messages", they should not all be construed as Riffle messages. At what point some of these things should be moved into Riffle is a rigid filter. 

This is an abbreviated list of flows:

* Creation- creation of new domains
* ShowNtell- requesting and presenting certificates. 

## Authentication (Identity)

Flows which relate to the identity of agents on the fabric.

### Domain Creation Flow

How domains are created.

* Application connects to fabric xs.a.b
* Node sends **WELCOME**.  
** Node rejects all messages not **REQUEST** or **HELLO**. 
* Agent generates keypair and *CSR*. Sends (*CSR*, [*credentials*]).
* Checks local domain storage. If domain is already registered, return **DENY**
* If client override methods are registered, calls *bool createDomain(domain, [credentials])*. If method returns *false* then return **DENY**.
* If not level 3, application replaces keys in CSR with locally generated keys.
* Save (*domain*, *certificate*). Optionally save keys. 
* Encrypt keys and certificate with private key used in **REQUEST** message.
* Return **ACCEPT**. 

**REQUEST** messages are not assigned to endpoints. 

**WELCOME** contains a nonce such that **HELLO** is protected from replays. 

Null domain either should be severly rate limited (.5 messages/s) or disconnected after a certain number of messages. 

*Credentials* is some set of identifying information an auth judges when creating new domains. The number and type of credentials are known out of band. 

Problem: how does the client library negotiate a level 2/3 auth?

#### Show N Tell Flow

The process by which an agent identifies itself to another agent.

* Domain sends **SHOW** containing certificate. 
* Reeiver replies with **TELL** containing certificate. 

### Authorization (Permissions)

Flows which relate to the ability of agents to make calls. 

#### Challenge Flow

The process by which a sender proves to intermediate nodes that the given message is expected by a set of receivers. 

* Domain *xs.a* sends message to unowned domain *xs.b*
* Node holds message and replies with **CHALLENGE**
* Client returns **RESPONSE**
* Node holds public key of permissions object. 

Is a set of held messages a vulurability?

**CHALLENGE** contains a nonce. 

**RESPONSE** is a permissions certificate: ([*endpointset*], *certificate*).

#### Pull Flow

The process by which an agent requests permission for a given endpoint. 

#### Push Flow

The process by which a domain offers an agent permissions.

#### Certificate Flow 

The process by which an agent obtains the certificate for a given domain.

#### Endy Flow

The process by which two agents establish a secure end-to-end channel.

#### Pub Endy Flow

The process by which a set of agents establish a secure end-to-end channel for publish.

> Meta: this could be merged into the Endy Flow if the end-to-end keys are symmetrical.  

### Revocation 

Flows relating to the destruction of cryptographic roles produced by the other flows.

#### Domain Revocation Flow

The process by which a domain is destroyed.

#### Permission Revocation Flow

The process by which a permission or set of permissions is removed from an agent. 

