[[Core appliance|Core-Appliances]] that enforces authorization rules such that unauthorized traffic is not propagated throughout the fabric. 

The internet allows unauthorized traffic to be forwarded to its target. The availability of denial of service attacks from unknown actors is a direct result of this, though blocking unpermitted traffic altogether does not protect against denial of service attacks from compromised known agents. 

## Requirements

Expose functionality to the fabric through normal messaging patterns. 

Given a message, return _accept_ or _deny_ based on the [[agent|Agent]] and intended [[action.|Action]]

## Specification