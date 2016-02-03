# Registers and Calls

## Lesson 3 - Type collections

We can take type enforcement one step further. Using Exis you can also specify that you would like a collection of types.

### Client sending incorrect collection

If a client tries to send a list of data to a backend that isn't properly formatted, it will fail, like the following example:

<exis-code name="Tour Reg/Call Lesson 3 Fails" editable></exis-code>

**Explanation:** The *client* (on the left) sends `[0, 1, "two"]` to `iWantManyInts`, which is a registered function in the *backend* (on the right) that expects a list of `ints`. Since the backend didn't receive the proper data, the function is never called and instead the error handler in the appropriate language is invoked in the client.

### Client sending correct collection

This code shows what happens when the client sends the proper collection to the backend.

<exis-code name="Tour Reg/Call Lesson 3 Works" editable></exis-code>

**Explanation:** The *client* (on the left) sends `["This", "is", "cool"]` to `iWantManyStrings`, which is a registered function in the *backend* (on the right). This is the common case - the backend got what it expected and so it responds with `"Thanks for 3 strings!"`.

### Use cases

This might seem like a trivial example, but if you want to send data between Python and Swift, you cannot do so without doing something crazy like only allowing `Any` objects in Swift, or double checking that all values you send in Python are of type `int` before they are sent. Exis provides a simple way to enable this type checking through declarations that make code simpler to write and understand.

**Up next:** declaring classes, then sending and enforcing them *between languages* in [Lesson 4](/pages/tour/regcall-lesson4.md).
