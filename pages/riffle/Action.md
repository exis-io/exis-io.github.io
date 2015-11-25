# Action

An action is a string that identifies a unique location for message verbs to associate with. It does not imply a receiver, only how the receiver should handle and route an incoming request.


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
