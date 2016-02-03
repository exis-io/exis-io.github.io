# Registers and Calls

## Lesson 4 - Classes

So we showed you how to send basic data types between clients and backends, but we live an an object oriented world. Using Exis you can also send class data, even *between different languages*.

As a simple example, we will build upon an app in an educational setting.

### Basic Student class

Let's create a `Student` class, which contains their `name`, `age` and `studentID`.

<exis-code name="Tour Reg/Call Lesson 4 Basic Student" editable></exis-code>

**Explanation:** The *client* (on the left) creates an instance of `Student`, and sends it to the `sendStudent` endpoint on the *backend*. Since the client and backend have an understanding of the `Student` class, Exis is able to send the object between the domains. This helps keep complicated data objects in order, and allows the developer to write specific functions to manipulate these objects, as seen in the next example.

__NOTE__: We hope by now that we have made this point very clear - if you try to send anything other than a `Student` object to `sendStudent` Exis will not allow it!!! Try it out for yourself.

### Student class functions

Since both the client and backend have an understanding of what the `Student` object looks like, we can define functions that change `Student.studentID` internally, as shown below.

<exis-code name="Tour Reg/Call Lesson 4 Student Functions" editable></exis-code>

**Explanation:** The *client* (on the left) sends a `Student` with `studentID = 1234` to the *backend* to get a new `studentID`. The `Student` object is returned with a new `studentID = 5678`.

### Use cases

Defining classes enables complicated objects to travel between clients and backends in a way that guarantees their schemas, not only what variables they contain, but even what type they are. This also helps to create functions that can either be shared between client and backend code, or even to help *store objects in a database* as we will see in a future tour.

**Up next:** This is enough to get you started on register and call functions in Exis. Next, check out how to send a message from one to many clients with our [Publish/Subscribe Tour](/pages/tour/pubsub-lesson1.md).
