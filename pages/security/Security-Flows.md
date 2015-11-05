# Security Flows

A *flow* is the set of actions or events that occur between multiple parties in order to achieve some result. The security flows all result in some change in global security status, either identity or permissions. 

Each flow should be protected against eavesdropping, replay attacks, and malicious parties. 

### Authentication (Identity)

Flows which relate to the identity of agents on the fabric.

#### Domain Creation Flow

The process by which a new domain (and thus agent) is created.

* Agent without identity connects to node attempting to gain identity xs.a.b
* Node assigns agent to null domain
** Node rejects all messages not of type REGISTER or AUTHENTICATE
** Node disconnects agent after 3 messages of any kind
* Agent sends message: *xs.a.auth/register([information], CSR)*
** *Information* is a set of knowledge known out of band and required by xs.a.auth
** *CSR* is a certificate signing request. The agent generates a keypair.
* Auth checks information and decides to create domain for agent. 
* Auth accepts CSR and returns signed certificate to agent

#### Presentation Flow

The process by which an agent identifies itself to another agent.

### Authorization (Permissions)

Flows which relate to the ability of agents to make calls.

#### Challenge Flow

The process by which a sender proves to intermediate nodes that the given message is expected by a set of receivers. 

#### Pull Flow

The process by which an agent requests permission for a given endpoint. 

#### Push Flow

The process by which a domain offers an agent permissions.

### Request

Flows which relate to the secure exchange of information or identity between a set of agents.

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

