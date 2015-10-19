Credentials consist of a certificate, public key, and private key. Together all three can be used to uniquely identify an [[agent|Agent]] to the fabric and other agents. The certificate binds the name of the [[domain|Domain]] to the public key and is signed by the domain which created it. 

## Credentials Requirements

Agents generally must have access to their credentials to operate on the fabric, except in the case of delegated authentication. **TODO**

The certificate contains the public key of the respective domain. 

The process by which certificates are presented is protected from replay or man-in-the-middle attacks.

Certificates have well-defined expiration dates. 

> V2: this is not available out of the box using X.509s, may not be possible unless we roll our own system. 

Each certificate contains the certificate of its superdomain, or the [[owner's|Owner]] public key is the only thing required to verify a certificate is authentic. 


### Authentication Flow Requirements 

This is the process by which the holder of a set of credentials opens a session with the fabric. 

