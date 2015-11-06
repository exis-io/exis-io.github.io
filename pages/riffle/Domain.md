# Domain

The name of an [agent][agent]. A set of strings seperated by peroids. Domains can not change.

## General

Every agent on the fabric has a name, a domain, and an owner. 

For example, the agent `sarah` owns a domain `delilah`. Delilah's domain is `sarah.delilah`. Sarah is the `superdomain` of `delilah` while `delilah` is the subdomain of `sarah`.

Superdomains have absolute control over subdomains. They can destroy or create subdomains at will and do not require [permissions][perm] to send actions.

### Examples

| Agent Type  | xsid |
| ------------- | ------------- |
| Owner  | `xs`  |
| Developer  | `xs.damouse`  |
| App  | `xs.damouse.toaster`  |
| Appliance  | `xs.auth`  |
| Developer using Appliance  | `xs.damouse.auth`  |
| App using Appliance  | `xs.damouse.toaster.auth`  |
| User in App  | `xs.damouse.toaster.dad`  |



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