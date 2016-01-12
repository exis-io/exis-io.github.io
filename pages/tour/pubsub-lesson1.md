# Publish and Subscribes

## Lesson 1 - Basic usage

There are many use cases in apps today where one user needs to send a message to *many* users - this basic messaging pattern is known as *Publish/Subscribe*, which we will call `Pub/Sub` for short. Support for this pattern is built into Exis by default, just like *Registers and Calls*.

**Basic one to many message:** The code below shows how a developer could setup chatroom-style communication where one user sends her message to many subscribers.

<exis-code name="Tour Pub/Sub Lesson 1"></exis-code>

**Explanation:** The *client* (on the left) publishes `"Hello"` to `myFirstSub`. The *backend* (on the right) has subscribed (in two different places) to the `myFirstSub` function - which results in both subscribed functions being called.
