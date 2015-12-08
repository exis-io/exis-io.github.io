# Core Appliances

Appliances which fundamentally alter the behavior of the fabric. Deployed and administrated by the owner of the fabric.

### Map

Handles routing within the fabric. 

### Authorization

Allows or denies messages from agents when the reach a node. 

[Bouncer][bouncer] implments centralized access control.

### Authentication 

[Auth][auth] implements the Public Key Infrastructure in some capacity. Holds some domain-relative root keypair and certificate. Creates subdomains by creating or signing new certificates. Different levels of Authentication appliance provide different levels of security for users. 

Every domain that can have subdomains must have an auth appliance. 

*Credentials* are any set of identifying information configurable by the domain that hosts the auth appliance. 

Levels:

0. Very basic auth, which stores usernames, passwords, and distributes tokens to each user to connect to the fabric.
1. Accepts credentials for login or registration. Creates certificate and keypair but does not distribute them.
2. Same as level 1, but returns the certificate and keypair on demand. 
3. Same as level 2, but never holds the certificate and keypair. 


### Registrar

HTTP Server which allows registration, token acquisition, and email verification to be performed off-fabric.

### AppManager

Top level appliance which user calls to create applications.

### Launcher

The launcher is tasked with managing appliances. It is closely tied to the underlying sandbox/container service. 

One of the core functions the launcher performs is suspending unused appliances: 

* The appliance being suspended should not be aware of its suspension. 
* Agents messaging a suspended appliance should have their messages block until the appliance comes back online. 
* The edge node for the given appliance should hold messages for a suspended appliance as well as its state (registrations and calls.) 
* When the edge node receives a message for a suspended appliance it should inform the launcher. The launcher wakes the appliance and alerts the node. Message is then delivered. 
* Agents cannot timeout within the time it takes to wake an appliance.
** Agents may have to receive a WAIT command. 


<!-- Reference for TOC -->

[auth]:/pages/appliances/Auth-Appliance.md
[bouncer]:/pages/appliances/Bouncer-Appliance.md
[map]:/pages/appliances/Map-Appliance.md
