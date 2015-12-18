# Authentication

The process by which new domains are created. A new [domain][domain] must ask another domain to become a subdomain by passing it credentials.

Certificates contain at least the following information:

1. Domain
2. Superdomain
3. Expiration
4. Public Key
5. Signature

Certificates are passed as bundles. Verification should occur in linear time with respect to the depth of the domain.

### Authentication Flows

### Domain Creation 

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

Null domain either should be severely rate limited (.5 messages/s) or disconnected after a certain number of messages. 

*Credentials* is some set of identifying information an auth judges when creating new domains. The number and type of credentials are known out of band. 

Problem: how does the client library negotiate a level 2/3 auth?

#### Show N Tell Flow

The process by which an agent identifies itself to another agent.

* Domain sends **SHOW** containing certificate. 
* Receiver replies with **TELL** containing certificate. 

#### Destruction

The process by which domains are destroyed. This is a work in progress, but can either be implemented through revocation lists, OCSP, or user handled queries. 

<!-- Reference for TOC -->

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
[flows]:/pages/security/Security-Flows.md