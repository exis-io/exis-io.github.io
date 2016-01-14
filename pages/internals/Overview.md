# Getting started with Exis

**Check out our live code examples in our [Tour][tour-basics].**

Here is a quick breakdown of the important aspects of Exis:

## 1 - Exis is used through client-side libraries

In order to take advantage of Exis, developers need to add one client-side library to their project, called [Riffle][riffle]. This library provides all of the core components of Exis: communication, type checking, serialization, database access, authentication, logging, and more.

## 2 - Exis is communication

At its core, Exis is a cloud-scale distributed message bus, we call the [Fabric][fabric]. We currently support two specific messaging patterns that encompass nearly everything that a developer could ever want to do:

* [Registers and Calls][tour-regcall-l1] - The simplest form of communication, it acts just like a traditional function call, except the function can exist on a server anywhere in the world (also called Remote Procedure Calls).
* [Publish and Subscribes][tour-pubsub-l1] - A one-to-many style communication that is like a chatroom, you send one message, and everyone subscribed receives the same exact message.

Exis uses *asynchronous code*. This is an advanced style of programming that can be confusing for many early developers, see the following example:

<exis-code name="Tour Basics 2"></exis-code>

When you run the above code you will notice that the output doesn't arrive in the same order, this is actually the expected result. You can see more about this in our [Tour Basics][tour-basics-async] page.

## 3 - Exis communication is simple

We decided to follow several conventions provided by existing communication methods, so much of our structure should feel familiar:

### Domains

**Domains** represent *unique entities* on the Fabric. They are defined by *reverse domain name notation*. For example, it is well accepted that `api.google.com` means that `google.com` has a subdomain of `api`. Using reverse domain name notation, it looks like `com.google.api`.

**Subdomains** If we look at `com.google.api`, we see that `api` is owned by `google`, which is owned by `com`. The same concept applies to Exis: all domains start with `xs` (because `xs` owns the Fabric) and all entities are subdomains of `xs`. 

Domains can be nested as much as the developer desires, it helps logically separate different aspects of an application, while also showing explicit ownership:

* `xs` - the controller of the fabric
* `xs.devname` - the developer's domain, owned by `xs`
* `xs.devname.myfirstapp` - the app's domain, owned by `xs.devname`
* `xs.devname.myfirstapp.specificuser` - a user of the myfirstapp, owned by `xs.devname.myfirstapp`

We will revisit subdomains in security below.

### Endpoints

Just like HTTP, we use a forward slash notation to define our actual functions to call, register, publish, or subscribe.

`xs.devname/endpoint` represents an action (called `/endpoint`) that can be taken on the `xs.devname` domain.

<!--
## 4 - Exis comes built-in with security

Exis provides security as a primary feature. This means it is built into our system from the ground up, not added as an after thought.

### Authentication


### Permissions
-->

__TOCTAGS__
