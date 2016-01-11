# Registers and Calls

## Lesson 2 - Type enforcement

In the last lesson you saw how easy it is to communicate with Exis.

Let's spice it up a bit - one of the incredibly powerful features of Exis is type enforcement. This means you can declare that your function requires specific types (string, int, boolean, a list of strings, etc...), and your *function is not called unless it received those types*. This is powerful because it eliminates developers from needing to write `if(type(myArg) == bool)` everywhere in their code.

### Client sending incorrect data

This code shows what happens if a client sends a `string` but the backend wanted an `int` instead.

<exis-code name="Tour Reg/Call Lesson 2 Fails"></exis-code>

**Explanation:** The *client* (on the left) sends `"Hi"` to `iWantInts`, which is a registered function in the backend (on the right) that expects an `int` as an argument. Since the backend didn't receive the proper data, the function is never called and instead the error handler in the appropriate language is invoked.

### Client sending correct data

This code shows what happens if a client sends the proper data type to the backend.

<exis-code name="Tour Reg/Call Lesson 2 Works"></exis-code>

**Explanation:** The *client* (on the left) sends `"Hi"` to `iWantStrings`, which is a registered function in the backend (on the right) that expects a `string` as an argument. This is the common case - the backend got what it expected and so it responds with `"Thanks for saying Hi"`.

### Use cases

When is this not useful? Wouldn't you like to always know that you can just call `myList.extend(otherList)` and not have to check if `otherList` is a list of the proper types first???


