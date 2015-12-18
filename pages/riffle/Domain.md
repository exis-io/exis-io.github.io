# Domain

Any software connected to the [fabric][fabric]. Domains have names, which are a set of strings separated by periods. Domains can not change.

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

### The Domain Object

Domains are represented through the *Domain* class. Each instance of the class represents a program running somewhere. You must instantiate at least one domain in order to connect to the fabric.


*Interface*


```
// Set the url to connect to. Defaults to *node.exis.io*
func setFabric(string, url)
```



```
// Set the url to connect to. Defaults to *node.exis.io*
func setDebugging() {}
```



```text
# Create a new domain as a root domain. This is usually the app.
init(string name) 

# Create as a subdomain. Represents you, other subdomains within the app, etc
# If the superdomain had already joined the fabric this domain immediately joins
init(string name, Domain superdomain) 


# Connect to a fabric. Subdomains and superdomains are automatically connected.
# Always call join on the domain representing the current instance
join()

# Disconnect this domain from the fabric. Superdomains and subdomains are not disconnected.
# Automatically undos any registrations or subscriptions called on this domain
leave()

# Delegate methods called when the domain joins or leaves the fabric. If a delegate is set these methods are called on the delegate, else they are called here.
onJoin()
onLeave()

# Catches errors that occur on any operation that doesn't have an error handler 
onError(string endpoint)
```


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