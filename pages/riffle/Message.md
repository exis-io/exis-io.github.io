A Remote Procedure Call (RPC) formatted as dictated by [riffle.][Riffle] Each message is passed as a single entity from one [agent][Agent] to another. 

Unlike IP traffic, nodes require agents to authorize their own traffic before they will forward it. 

### Message Patterns

A message contains some sort of information the sending agent wishes to transmit to the receiving agent. *Message Patterns* are simple sub-protocols that describe how messages are to be passed around in order to realize communication. Messages can not be sent outside of a message pattern.

[Pub/Sub][PubSub] is also known as *publish/subscribe* enables one agent to communicate with many other agents. 

[Register/Call][RegisterCall] enables RPC-like functionality. 

### Requirements

Messages are routable: indicates **TO** and **FROM**.

Granularly authorizable. Routers will not forward or process messages unless presented with a pemissions object. 

Contains the [action][Action] as well as the receiving domain. 

Can travel across arbitrarily many nodes. Agents on either end of the communication are not made aware of the paths their messages take. 

<!-- Reference for TOC -->

[Riffle]:/pages/riffle/Riffle.md
[Agent]:/pages/riffle/Agent.md
[Action]:/pages/riffle/Action.md
[PubSub]:/pages/riffle/PubSub.md
[RegisterCall]:/pages/riffle/RegisterCall.md
