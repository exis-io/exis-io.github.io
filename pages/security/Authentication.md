# Authentication

The process by which new domains are created. A new [domain][domain] must ask another domain to become a subdomain by passing it credentials.

This is a work in progress.

**Credentials**- a set of identifying information provided by a domain when it attempts to auth. 

Certificates contain at least the following information:

1. Domain
2. Superdomain
3. Expiration
4. Public Key
5. Signature

Certificates should be passed around with their supers, since it removes the need for a lookup mechanism. 

See [security flows][flows] for information on security operation. 

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