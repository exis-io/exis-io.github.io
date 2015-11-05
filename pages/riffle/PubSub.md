# Publish/Subscribe

Pub/Sub is a form of [messaging][Message] on the Fabric. This enables a quick and easy way to perform one-to-many operations.

## Example

The simplest example of pub/sub is through the use of a chatroom application.

A developer can write the following lines of code, and instantly have a chat room feature added to her application:

```
session.subscribe("/chat", function sub(line) {
    chatLog.html += line;
});

session.publish("/chat", "this is so cool!");
```

<!-- Reference for TOC -->

[Message]:/pages/riffle/Message.md
