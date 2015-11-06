# Security

If you saw [the 10 rules](/pages/general/Home.md#the-10-rules) on the home page you may have noticed a rule that read `security is not a feature`. Security is a tricky topic. On one hand, networked applications can't get by without implmenting security these days. On the other hand security topics tend to be complicated to understand and code. 

## Decentralized 

One of the key tenants of Exis is its decentralized nature. While many existing platforms enable security like we do, our focus is on the scalability of this security. This means there is no centralized point of access (read: point of failure) for the Fabric.

## Authentication

Unlike the internet, access to the Fabric is controlled. This enables developers to know they can only talk to things that have been authenticated to the network, thus simplifying their verification requirements. A secondary aspect is the idea that any agent communicating on the fabric has an associated identification, making it easier to target endpoints while writing apps (ie. every time you log onto the internet your IP address can change, but every time you access the fabric your ID will always be `xs.joebob`).

[Agents][agent] all have to be authenticated by an application before they can use the fabric. They exchanve credentials, which can be usernames, passwords, or any other identifying information, with an [**Auth**][auth] appliance. Out of the box, *Auth* appliances handle the base cases for user authentication. They can also be customized by the developer to handle any odd cases. 

## Permissions

A permission is the declaration that a user or application is allowed to make a call. This functionality is something the internet sorely lacks-- the ability for receivers to reject traffic!

<!-- ## Protecting Data: End to End

## Protecting Data: At Res -->

## Where's the Gift Shop?

Thats the end of the tour. Check out the [samples][samples] and pick up some souvenirs. 


