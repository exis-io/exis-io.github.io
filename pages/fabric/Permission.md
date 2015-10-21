A permission allows an [[agent|Agent]] to perform an [[action|Action]] where that action resides on a domain that is *not* a a direct descendant of that agent. A permission is a tuple of (agent, intended action) and is provided by the domain in which the action resides. 

Implementation of permissions is not yet final. 

Related content: 

[OAuth2](https://gist.github.com/mziwisky/10079157)

#### Example

The user `damouse` in the root namespace wishes to call the action `listWebsites` on his own app called `parentalControls`. Because `parentalControls` is a subdomain of `damouse`, he does not need permission:

    # damouse's domain
    pd.damouse                                   

    # damouse's app
    pd.damouse.parentalControls             .

    # endpoint of intended action     
    pd.damouse.parentalControls/listWebsites     

If `dale` created the `parentalControls` app, `damouse` needs explicit permission to perform this action:

    # endpoint is not in a subdomain of pd.damouse
    pd.dale.parentalControls/listWebsites     

To perform the action `damouse` must first obtain the following permission:

    pd.damouse:pd.dale.parentalControls/listWebsites

> Meta: the notation of action, endpoint, and message pattern verb is not final.
> Additionally this may be a poor example, since we decided not to allow exis users access to each other's apps in an attempt to limit permissions/certificate complexity. 

###Possible Implementations

**Traditional Access Control**:
A central database of permission tuples that nodes query when presented with messages.

*Pros*

* Centralized and well understood model
* Flexible- new permissions easily added

*Cons*

* Smaller/Single point of failure
* Fabric not tolerant to fragmentation

**Inherent**:
When a domain creates a subdomain, it specifies permission tuples the subdomain should inherently have access to. No extra infrastructure is required other than the authentication infrastructure. The certificate an agent presents is sufficient to determine permissions.

*Pros*

* Don't need other infrastructure
* Checking permissions is a constant time operation that doesn't require a message
* Fabric tolerant to fragmentation

*Cons*

* New permissions can not be added to existing agents without replacing existing certificate
* Cannot revoke permissions without revoking an certificate

**Keychain**

A permission request is signed with the private key of the authorizing body. The keychain is the set of all permissions an agent possesses. 

> Meta: the more I struggle with this problem the more I think we should rely on the most popular SSO/multi-domain permissions framework used today: OAuth. The keychain suggestion is closest to this, though storage of tokens is annoying. 

*Pros*

* Don't need other infrastructure
* Checking permissions is a constant time operation that doesn't require a message
* Fabric tolerant to fragmentation
* Permissions can be issued and revoked with fine-grained control
* Can more easily send permission with request across fabric

*Cons*

* WAMP modification: have to save keyring and send with permissions
* Permissions have to be protected against replay attacks

## Requirements

A permission must be issued by the domain in which the permission affects. Domains cannot issue permissions to subdomains more than one level deep. 

A permission must be presented to the fabric at the node in which the agent is also a tenant (an edge node.)

> V2 (Untrusted Nodes): permissions must be presented to each intermediate node in the fabric on the way to the target.

## Specification