# Riffle

All [agents][Agent] on the fabric communicate using the Riffle protocol. It runs atop websockets. Applications generally rely on riffle client libraries.

## Requirements

Riffle is distributed as a client-side library. It is not compatible with WAMP. A [developer][Agent] will generally download and install the client library before deploying an application to the fabric. 

Riffle should internalize networking common practices.

1. Type guarantees, object serialization
2. Connection attempts, retrying
3. Implicit authentication and authorization management

<!-- Reference for TOC -->

[Agent]:/pages/riffle/Agent.md
