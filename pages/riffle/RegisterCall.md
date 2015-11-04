Register/Call is a form of [messaging][Message] on the Fabric. This enables a quick and easy way to perform one-to-one operations. This represents the same functionality of Remote Procedure Calls (RPC).

By leveraging the Riffle libraries, the process of registering and calling functions should look identical to making local function calls - even though under the hood these function calls could actually go out and execute on other machines in the cloud!

## Example

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
