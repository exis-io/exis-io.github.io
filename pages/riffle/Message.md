# Message

A Remote Procedure Call (RPC) formatted as dictated by [riffle.][Riffle] Each message is passed as a single entity from one [domain][Domain] to another. 

Unlike IP traffic, nodes require domains to authorize their own traffic before they will forward it. This comes in the form of [permissions][perm].

## Message Patterns

A message contains some sort of information the sending domain wishes to transmit to the receiving domain. *Message Patterns* are simple sub-protocols that describe how messages are to be passed around in order to realize communication. Messages can not be sent outside of a message pattern.

## Publish/Subscribe

Publish/Subscribe, or Pub/Sub, is a pattern where one domain sends a message to many other domains. This enables a quick and easy way to perform one-to-many operations.

## Example

The simplest example of pub/sub is through the use of a chatroom application.

A developer can write the following lines of code, and instantly have a chat room feature added to her application:

```
session.subscribe("/chat", function sub(line) {
    chatLog.html += line;
});

session.publish("/chat", "this is so cool!");
```

<!-- Reference for TOC -->

[Message]:/pages/riffle/Message.md

## Register/Call

Register/Call is a form of [messaging][Message] on the Fabric. This enables a quick and easy way to perform one-to-one operations. This represents the same functionality of Remote Procedure Calls (RPC).

By leveraging the Riffle libraries, the process of registering and calling functions should look identical to making local function calls - even though under the hood these function calls could actually go out and execute on other machines in the cloud!

### Example

A very simple example of this would perform the task of multiplying a very large number on a separate machine with more resources than the smartphone or browser a user may have.

```
// Somewhere on a server:
session.register("/computePrime", function findThePrime(primeRequested) {
    // This function finds and returns the prime number requested
    // a very computationally complex task!
    return 42;
}

// Somewhere on a smartphone:
thePrime = session.call("/computePrime", 99999999);
```

<!-- Reference for TOC -->

[Message]:/pages/riffle/Message.md


## Asynchronous Programming 

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

[message]:/pages/riffle/Message.md
[domain]:/pages/riffle/domain.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/domain.md
[endpoint]:/pages/riffle/Endpoint.md
[samples]:/pages/samples/Samples.md

[auth]:/pages/appliances/Auth-Appliance.md
[perm]:/pages/security/Permission.md