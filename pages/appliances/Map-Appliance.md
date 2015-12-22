An appliance that provides routing information to nodes. Functionality provided by maps can either be provided by a single instance or multiple instances. Fabric topology should be absolutely configurable through maps

Most likely attempts to maintain some view of the global node topology and the list of tenants present at each node. 

## Requirements

Have to expose functionality to the fabric through stock messaging patterns. 

Given a message (and its target domain) and a node, return the next hop that node should forward the message. Ideally the message moves closer to its intended recipient with each hop.  

Accept updates to links between nodes that reflect changes in the global topology. 

Accept updates to tenants at a given node, where a tenant is any [[agent.|Agent]]

Instruct nodes to connect to specific other nodes. 


## Specification

Starting map:

    python -m map.main --state <network-state-file>

With the --state argument, map will save and restore the state of its network graph to the give file name.

map subscribes to pd.map.linkStateUpdate, which takes the following keyword arguments:
* sender: (string) domain of the agent/node who is producing the update
* source: (string) domain of the link source (links are unidirectional)
* destination: (string) domain of the link destination
* cost: (integer) cost metric for the link, typically one, negative values are strictly not permitted
* up: (boolean) link is up or down

map registers pd.map.nextHop, which takes two arguments:
* source: (string)
* destination: (string)