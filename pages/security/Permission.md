# Permission

A *permission* is the ability for an [*domain*][domain] to send a message to an [*endpoint*][endpoint]. Explicit permission is the combination of an agent and an endpoint. Implicit permission is permission automatically granted to domains that send messages to their own subdomains. 

A [domain][domain] has to give a domain that wants to send it messages explicit permission (if the sender doesn't have implicit permission.)

**Roles** are sets of permissions that are easily manipulated as a single unit. 

Permissions are either handled through the web interface at [my.exis.io](https://my.exis.io) or programmatically by calling the [*Bouncer*][bouncer] appliance.

<!-- A certificate, public key, and private key that tie the name of the allowed party to an endpoint. Certificate that consists of an [[endpoint|Endpoint]], the public key of its holder, and a signature by the issuing party. A permission object is only required for *horizontal* and *upward* endpoints. -->

Example of implicit permission: `xs.damouse` automatically has permission.

```
Endpoint:   xs.damouse.app/hello
Agent:      xs.damouse
```

Example of explicit permission: `xs.anna` requires explicit permission from `xs.damouse`.

```
Endpoint:   xs.damouse.app/hello
Agent:      xs.anna
```

<!-- 
## Granting Permissions

## Permission Flows

Flows which relate to the ability of agents to make calls. 

### Challenge Flow

The process by which a sender proves to intermediate nodes that the given message is expected by a set of receivers. 

* Domain *xs.a* sends message to unowned domain *xs.b*
* Node holds message and replies with **CHALLENGE**
* Client returns **RESPONSE**
* Node holds public key of permissions object. 

Is a set of held messages a vulnerability?

**CHALLENGE** contains a nonce. 

**RESPONSE** is a permissions certificate: ([*endpointset*], *certificate*).

#### Pull Flow

The process by which an agent requests permission for a given endpoint. 

#### Push Flow

The process by which a domain offers an agent permissions.

#### Permission Revocation Flow

The process by which a permission or set of permissions is removed from an agent. Again, either revocation lists, OCSP, or auth-hosted checking.
 -->

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
[bouncer]:/pages/appliances/Bouncer-Appliance.md

[perm]:/pages/security/Permission.md


