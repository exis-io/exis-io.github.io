*Injection* is the process by which any agent gains access to an appliance. The creator of the appliance my charge for usage of the appliance.
<!-- TODO
Payment is processed by the [wallet][Wallet-Appliance] with the cooperation of the fabric owner. 
-->


## Requirements

Injection adds the functionality of an appliance into a subdomain. 

> Example: *xs.damouse* wants to use the appliance *storage.* After injection, *xs.damouse* gains access to the endpoint */action* as *xs.damouse.storage/action.* 

The creator of an appliance cannot gain direct access to an injected appliance. 

The user of an injected appliance does not gain source code access to the appliance. 

The list of injectible is stored somewhere. 

<!-- Reference for TOC -->

[Wallet-Appliance]:/pages/appliance/Message.md
