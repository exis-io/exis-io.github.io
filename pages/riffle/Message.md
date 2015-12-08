# Message

A Remote Procedure Call (RPC) formatted as dictated by [riffle.][Riffle] Each message is passed as a single entity from one [agent][Agent] to another. 

Unlike IP traffic, nodes require agents to authorize their own traffic before they will forward it. 

### Message Patterns

A message contains some sort of information the sending agent wishes to transmit to the receiving agent. *Message Patterns* are simple sub-protocols that describe how messages are to be passed around in order to realize communication. Messages can not be sent outside of a message pattern.

[Pub/Sub][PubSub] is also known as *publish/subscribe* enables one agent to communicate with many other agents. 

[Register/Call][RegisterCall] enables RPC-like functionality. 

## Examples 

Every messaging call returns a deferred. The deferred succeeds or fails appropriately. Deferreds can be ignored, in which case subsequent calls to the following methods proceed concurrently. If the deferred does not have an error handler the domain automatically logs the error in onError.

```none
deferred register(string domain, function handler)
deferred subscribe(string domain, function handler)
deferred publish(string domain, any... arguments)
deferred call(string domain, any... arguments, function handler)

deferred unregister(string domain)
deferred unsubscribe(string domain)
```

Every messaging pattern call except publish accepts a pointer to a function. This function must have arguments and return types that are *Cuminicable*, see section below. 

*Call* and *subscribe* function handlers cannot return values. *Register* may return values.

<!-- Reference for TOC -->

[Riffle]:/pages/riffle/Riffle.md
[Agent]:/pages/riffle/Agent.md
[Action]:/pages/riffle/Action.md
[PubSub]:/pages/riffle/PubSub.md
[RegisterCall]:/pages/riffle/RegisterCall.md
