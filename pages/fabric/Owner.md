The administrator and ultimate agent for an entire fabric, denoted by the top level domain. This agent holds the root keypair used to sign all subdomains. 

## Requirements

Fabric must have some central node that all new sessions connect to. This node should be able to redirect new agents to nodes nearer to them based on the configuration and topology of the fabric.

Edge nodes should be able to intercept association requests to the central node and take responsibility for those agents.

The central node should not accept new [tentants][Tenant] until core appliances have connected and exposed their functionality through known message patterns.

Core appliances and the core node should have an agreed upon and configurable set of names for core appliance functions.

The core node and all other nodes should only accept new node connections as prescribed by some authority.

## Specification

### Deployment

Deployment describes the process of establishing a new fabric. This section is incomplete. 

#### Reserved Endpoints

Core appliances and nodes must both have domains. An owner may choose to create *reserved endpoints* under which to place these two kinds of agents. While this is configurable, not creating a reserved domain means the scope of subdomains will be limited-- when allowing developers to register, for example. 


<!-- Reference for TOC -->

[Tenant]:/pages/fabric/Tenant.md
