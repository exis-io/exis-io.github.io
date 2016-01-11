# Registers and Calls

## Lesson 1 - Basic usage

This first lesson will explain what Exis is and why developers should use it in their apps.

Any useful application written today requires networking to be functional (fetching data from databases, authenticating users, etc..). The code that enables this networking is repetitive, error-prone, and overall should be simplified if not completely eliminated.

**Basic client-server communication:** The code below shows how a developer can call a function in the backend.

<exis-code name="Reg/Call str str"></exis-code>

**Explanation:** The *client* (on the left) sends `"Hello"` by *calling* `regStrStr`, which is a *registered* function that returns `"Hello World"` from the *server* (on the right).

### Use cases

This is the most generic type of communication, it falls under several categories:

* **Fetching data from databases** - such as their username and email.
* **Authenticating users** - such as with this username/password combo can they login successfully?
* **General server functions** - requests like is this User friends with another User?

