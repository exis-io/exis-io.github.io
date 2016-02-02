# Riffle Overview

Riffle is the protocol and supporting client-side libraries that enable [domains][domain] to communicate on the Exis [fabric][fabric].

Riffle helps move your data and requests around, the fabric actually does the moving. As much as possible, riffle strives to reduce all networking code down to one line: something that looks much like a method call in your native language.

**Riffle handles the following:**

1. Type guarantees
2. Serialization
3. Connection Management
4. Authentication
5. Addressing

## Cumin

Cumin provides the serialization and type guarantees that allow Exis to remove boilerplate code from view.

### Receiving data:
When you define functions that will receive data, you can specify the arguments:
<exis-code name="Want Definitions Recv" action="defs" norepl hljs></exis-code>

### Sending data:
When you call functions in the cloud, you can specify what the return values must look like:
<exis-code name="Want Definitions Send" action="defs" norepl hljs></exis-code>

### Working with objects
More complex objects can be created and sent between languages using *riffle.Model*:
<exis-code name="Want Definitions Models" action="defs" norepl hljs></exis-code>

__TOCTAGS__

