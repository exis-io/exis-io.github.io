# Credentials

Credentials consist of a certificate, public key, and private key. Together all three can be used to uniquely identify an [[agent|Agent]] to the fabric and other agents. The certificate binds the name of the [[domain|Domain]] to the public key and is signed by the domain which created it. 

After creation, an agent must obtain some set of [credentials][creds] in order to access the fabric. Credentials are some set of data which the agent can use to prove its identity and protect its communications. 

## Credentials Requirements

Agents generally must have access to their credentials to operate on the fabric, except in the case of delegated authentication. **TODO**

The certificate contains the public key of the respective domain. 

The process by which certificates are presented is protected from replay or man-in-the-middle attacks.

Certificates have well-defined expiration dates. 

Each certificate contains the certificate of its superdomain, or the [[owner's|Owner]] public key is the only thing required to verify a certificate is authentic. 

### Certificate Flows 

Flows relating to the secure transfer of keys, certificates, etc. 

#### End to End Flow

The process by which two agents establish a secure end-to-end channel.

#### Multi End to End Flow

The process by which a set of agents establish a secure end-to-end channel for publish.

> Meta: this could be merged into the Endy Flow if the end-to-end keys are symmetrical.  




[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md
[samples]:/pages/samples/Samples.md

[auth]:/pages/appliances/Auth-Appliance.md

[perm]:/pages/security/Permission.md
