# Domain

A string in reverse domain name form that uniquely identifies a single agent. Domains may be nested by separating subdomains with periods. A subdomain is owned by its parent. 


## General

Domains are subtly different from names, although the name of an agent is also the name of its domain. A domain is a realm of influence and administration and provides implicit permissions management. 

### Examples

| Agent Type  | xsid |
| ------------- | ------------- |
| Owner  | `xs`  |
| Developer  | `xs.damouse`  |
| App  | `xs.damouse.toaster`  |
| Appliance  | `xs.auth`  |
| Developer using Appliance  | `xs.damouse.auth`  |
| App using Appliance  | `xs.damouse.toaster.auth`  |
| User in App  | `xs.damouse.toaster.dad`  |
