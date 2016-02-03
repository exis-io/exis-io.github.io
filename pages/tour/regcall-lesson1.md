# Registers and Calls

## Lesson 1 - Basic usage

Any useful application written today requires networking to be functional (fetching data from databases, authenticating users, etc..). The code that enables this networking is repetitive, error-prone, and overall should be simplified if not completely eliminated.

**Basic client-backend communication:** The code below shows how a developer can call a function in the backend.

<exis-code name="Tour Reg/Call Lesson 1" editable></exis-code>

**Explanation:** The *client* (on the left) sends `"Hello"` by *calling* `myFirstFunc`, which is a *registered* function that returns `"Hello World"` from the *backend* (on the right).

### Use cases

This is the most generic type of communication, it falls under several categories:

* **Fetching data from databases** - such as their username and email.
* **Authenticating users** - such as with this username/password combo can they login successfully?
* **General backend functions** - requests like is this User friends with another User?

**Up next:** Type enforcement of arguments and return values between client/backend functions in [Lesson 2](/pages/tour/regcall-lesson2.md).
