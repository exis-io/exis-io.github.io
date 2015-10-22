# Traditional Networking Architectures

Before we dive into all the ways Exis makes the world a better place, lets take a look at the current state of affairs. A vast majority of mobile apps written today rely on remote servers, either created by the developer of the application or produced by third parties. Web pages used to be delivered by a server once at a time but now frequently phone home. Desktop software may communicate with the rest of the world less frequently than the first two categories but still has to deal with the problems detailed here.

## Basic Communication

HTTP-based
Cant push very well
Socket based
TCP doesn't work well or at all in browsers
Websockets works, but still have to create protocol management

## Passing Data

Addressing
Serialization
Validation

## Security

Encrypted channels
End to End
Authentication
Authorization

## Servers

Modern servers, 1st party
Modern containers

[Next, lets check out riffle.](/pages/tour/Riffle.md)