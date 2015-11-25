# Security

Exis integrates common network security patterns, including authorization, authentication, protection of live communication, and protection of static data. A Public Key Infrastructure underpins the security model. 

## Credentials

Credentials consist of a certificate, public key, and private key. Together all three can be used to uniquely identify an [[agent|Agent]] to the fabric and other agents. The certificate binds the name of the [[domain|Domain]] to the public key and is signed by the domain which created it. 

After creation, an agent must obtain some set of [credentials][creds] in order to access the fabric. Credentials are some set of data which the agent can use to prove its identity and protect its communications. 

### Certificate Flows 

Flows relating to the secure transfer of keys, certificates, etc. 

#### End to End Flow

The process by which two agents establish a secure end-to-end channel.

#### Multi End to End Flow

The process by which a set of agents establish a secure end-to-end channel for publish.



<!-- After creation, an agent must obtain some set of [credentials][creds] in order to access the fabric. Credentials are some set of data which the agent can use to prove its identity and protect its communications. 

A [permission][perm] is required when sending any message to any [endpoint][endpoint] and generally represents the receiver's willingness to receive the given message.  -->

<!-- A domain may destroy its immediate subdomain or created permissions through [[revocation.|Revocation]] All subdomains of the given domain are also then invalid. -->

<!-- The presentation of credentials is defined by the distribution [[distribution|Distribution]] flows. Each of these flows defines the rules on how agents exchange or obtain keys. -->

<!-- > V2: end to end encryption for pub/sub and reg/call requires different key distribution methods and management. These requirements should be considered but are not detailed here.  -->



# Security

If you saw [the 10 rules](/pages/general/Home.md#the-10-rules) on the home page you may have noticed a rule that read `security is not a feature`. Security is a tricky topic. On one hand, networked applications can't get by without implmenting security these days. On the other hand security topics tend to be complicated to understand and code. 

## Decentralized 

One of the key tenants of Exis is its decentralized nature. While many existing platforms enable security like we do, our focus is on the scalability of this security. This means there is no centralized point of access (read: point of failure) for the Fabric.

## Authentication

Unlike the internet, access to the Fabric is controlled. This enables developers to know they can only talk to things that have been authenticated to the network, thus simplifying their verification requirements. A secondary aspect is the idea that any agent communicating on the fabric has an associated identification, making it easier to target endpoints while writing apps (ie. every time you log onto the internet your IP address can change, but every time you access the fabric your ID will always be `xs.joebob`).

[Agents][agent] all have to be authenticated by an application before they can use the fabric. They exchanve credentials, which can be usernames, passwords, or any other identifying information, with an [**Auth**][auth] appliance. Out of the box, *Auth* appliances handle the base cases for user authentication. They can also be customized by the developer to handle any odd cases. 

## Permissions

A permission is the declaration that a user or application is allowed to make a call. This functionality is something the internet sorely lacks-- the ability for receivers to reject traffic!


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