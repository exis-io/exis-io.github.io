# Publish and Subscribes

## Lesson 2 - Type enforcement

One of the incredibly powerful features of Exis is type enforcement. This means you can declare that your function requires specific types (string, int, boolean, a list of strings, etc...), and your *function is not called unless it received those types*. This works for both registers and calls, as well as publishes and subscribes.

### Publishing incorrect data

This code shows what happens if a `string` is published to an `int` subscriber.

<exis-code name="Tour Pub/Sub Lesson 2 Fails"></exis-code>

**Explanation:** The *publisher* (on the left) sent `"Hi"` to the *subscriber* (on the right). However the subscriber function isn't called - this happens because the value passed in was a `String` and so the Exis type checking refused to call the function.

__Warning__: It is VERY important to note here that not only was the `iWantInts` function not executed, but also the Error function from the Publisher isn't executed either! Unlike *calls* which require *register* return values, publishes never receive a return value from subscribers.

**Why can't publishes get return values?** The publish/subscribe system is designed for one user to send an identical message out to millions of subscribers. If a handful of these subscribers decide they don't like the message, should the publisher get bombarded with errors? We decided against this in our implementation.

There ARE cases where a publish can fail (such as incorrect permissions), but failures due to type checking is not one of them.

### Publishing correct data

This code shows what happens if a `string` is published properly to a `string` subscriber.

<exis-code name="Tour Pub/Sub Lesson 2 Works"></exis-code>

**Explanation:** The *publisher* (on the left) sends `"Hi"` to `iWantStrings`, which is a *subscribed* function (on the right) that expects a `string` as an argument. This is the common case.

### Use cases

Again, we ask - when is this not useful? Wouldn't you like to always know that you can just call `myList.extend(otherList)` and not have to check if `otherList` is a list of the proper types first???

<!--**Up next:** Type enforcement for collections of types between publishers and subscribers in [Lesson 3](/pages/tour/pubsub-lesson3.md).-->
