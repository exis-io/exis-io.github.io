Any source of a message; an application, developer, user, or appliance, or node that communicates over the fabric.


## Types of Agent

### Developer
Someone who uses exis when developing their applications. 

A developer is different than a [[user|User,]] which is the final end-user for a developer's application. Developers know they're using exis, users do not. 

### User

The ultimate user of an application that communicates over a fabric. These users may not know the application is built atop a fabric. 

### Node

Router. TODO

### Appliance

TODO

## Requirements

Every agent must authenticate with the fabric before being allowed to send messages. Generally this means presenting some certificate signed by a superdomain.

Each agent is identified by their name/domain once authenticated. This roughly represents their location on the fabric. 

Unauthenticated agents have some means to gain certificates through login/register functionality. This access limited by the fabric to prevent attack.

## Specification
