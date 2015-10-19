Exchanges credentials for an X.509 certificate representing an [[agent|Agent]] and their new [[subdomain|Domain]]. Each domain has access to some stock auth appliances and can configure it as needed. The superdomain must implicitly or explicitly approve this action.

An agent and domain exist through their certificate and their certificate only. Each domain is wholly responsible for any subdomains created beneath them. As such, each domain can (may?) have access to an auth appliance that can issue new certificates. New certificates are always signed with the current domain's certificate. If that certificate is revoked all subdomains' certificates are also revoked. 

A set of "credentials" is configurable by the issuing domain: the domain can request any set of information to create a subdomain. 

#### Levels

Levels are used to segregate similar appliances by their complexity or perceived utility. In the case of authentication, username and password are and have always been a poor tool for security. To counteract this while still providing utility there are three simple categories of appliance:

1. Certificates are generated and stored. Exchanges credentials for a copy of the certificate
2. Certificates are generated and stored, but only returned once. Requesting the certificate again requires some additional authentication.
3. Certificates are generated, sent to the requesting agent, and erased. They can never be recreated.

The third level provides the most security but is the most onerous. A mobile app, desktop app, or browser extension that can provide two-factor authentication, store the key, and act as an on-device issuer is very secure, but the loss of the device would be difficult to deal with

> Meta: the level 3 appliance could still store the keys but encrypt them with some user-provided password. Recovering the keys for the user would still be a painful process (intentionally!) while protecting them from device loss. 

## Requirements

Does not accept credentials in which the resulting domain would result in a name conflict with existing domains.

Accepts registration requests, verifies credentials, and returns a new certificate signed by the issuing domain.

Accepts login requests, verifies credentials, and returns a previously generated certificate.

## Specification