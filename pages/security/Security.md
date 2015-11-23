# Security

Exis integrates common network security patterns, including authorization, authentication, protection of live communication, protection of static data. A Public Key Infrastructure underpins the security model. 

After creation, an agent must obtain some set of [credentials][creds] in order to access the fabric. Credentials are some set of data which the agent can use to prove its identity and protect its communications. 

A [permission][perm] is required when sending any message to any [endpoint][endpoint] and generally represents the receiver's willingness to receive the given message. 

<!-- A domain may destroy its immediate subdomain or created permissions through [[revocation.|Revocation]] All subdomains of the given domain are also then invalid. -->

<!-- The presentation of credentials is defined by the distribution [[distribution|Distribution]] flows. Each of these flows defines the rules on how agents exchange or obtain keys. -->

> V2: end to end encryption for pub/sub and reg/call requires different key distribution methods and management. These requirements should be considered but are not detailed here. 


## Requirements 

End to end- messages can only be read by their intended recipients.

Data at rest- data stored by components of the fabric can only be read by the owner of that data.

Authenticity- the identity of [[agents|Agent]] can be determined with high confidence.

Authorization- traffic is only allowed on the fabric where the recipient of that traffic agreed to receive it.

Attribution- the receiver of a message can conclusively determine its source.

Decentralized- the security model does not require centralized components to function.

Incorruptible- security guarantees hold if the [[owner|Owner]] is compromised by malicious third parties or nation-states.

Identity Protection- the identity of all agents, but especially [[users|Users]] and [[developers|Developers]] is protected as rigorously as possible.  


[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md
[samples]:/pages/samples/Samples.md

[auth]:/pages/appliances/Auth-Appliance.md
[creds]:/pages/security/Credentials.md
[perm]:/pages/security/Permission.md

[perm]:/pages/security/Permission.md
[flows]:/pages/security/Security-Flows.md