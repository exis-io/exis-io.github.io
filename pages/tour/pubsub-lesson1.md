# Publish and Subscribes

## Lesson 1 - Basic usage

There are many use cases in apps today where one user needs to send a message to *many* users - this basic messaging pattern is known as *Publish/Subscribe*, which we will call `Pub/Sub` for short. Support for this pattern is built into Exis by default, just like *Registers and Calls*.

**Basic one to many message:** The code below shows how a developer could setup chatroom-style communication where one user sends her message to many subscribers.

<exis-code name="Tour Pub/Sub Lesson 1"></exis-code>

**Explanation:** The *client* (on the left) publishes `"Hello"` to `myFirstSub`. The *backend* (on the right) has subscribed (in two different places) to the `myFirstSub` function - which results in both subscribed functions being called.

### Use cases

This is the other generic type of communication, it enables developers to:

* **Implement chatroom communication** - Facebook, Twitter, Snapchat... any of these services use this style of communication.
* **Internet of Things** - Let a temperature sensor publish data - that data can be consumed by long term storage, real time graphs, actuators, etc.. without needing to write any extra code.
* **Real time data** - Publishes don't wait for a response, so when you want to send real time data a `Pub/Sub` is the way to go!

**Up next:** Type enforcement of arguments between publishers and subscribers in [Lesson 2](/pages/tour/pubsub-lesson2.md).
