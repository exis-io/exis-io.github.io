# Action and Endpoint

An action is a string that identifies a unique location for message verbs to associate with. It does not imply a receiver, only how the receiver should handle and route an incoming request.

Endpoints are the combination of a domain and an action. Each endpoint specifies who gets messages and where they end up. 


## General

If domains are the names of domains, then [*actions*](/pages/riffle/Action.md) are what they can do. You can think of domains as nouns and actions as verbs. An action always begins with a forward slash. Actions can have subactions similar to subdomains but without the concept of ownership. Subactions are separated by a forward slash (`/`). 

A basic action: 

```
/hello
```

One subaction:

```
/hello/there
```


## Endpoint example

The user _damouse_ may wish to greet authorized agents with a string indicating his mood. _damouse_'s domain is: 

    xs.damouse

He may choose to expose this functionality under the action:

    /mood

The corresponding endpoint is:

    xs.damouse/mood

