# Riffle

<sub>*A riffle is a short, relatively shallow and coarse-bedded length of stream over which the stream flows at slower velocity but a higher turbulence than it normally does in comparison to a pool.*</sub>

Riffle is a protocol and library that makes network code look like any other local code.

Its the primary way developers interact with the Fabric. Riffle helps move your data around, the fabric actually does the moving. As much as possible, it strives to reduce all networking code down to one line: something that looks much like a method call. A developer shouldn't have to deal with redundant code, code they may not understand, or complex protocols. Of course, none of this is bought at the expense of complexity! Under the hood, all the same kinds of code are running and handling the gritty details.

## Message Patterns

Getting information from one place in a program to one place in another program: that's what networking code does. The rest of the code enables or protects that process. 

With Riffle we want to deal only with the high level operations, or sending a [message][message] from one application to another. You can exchange messages between applications in different ways called *message patterns.* 

__Note:__ In software development, a pattern (or design pattern) is a general solution to a design problem that recurs repeatedly in many projects. Software designers adapt the pattern solution to their specific project. Patterns use a formal approach to describing a design problem, its proposed solution, and any other factors that might affect the problem or the solution. A successful pattern should have established itself as leading to a good solution in three previous projects or situations.

In order to keep all of our terms consistent and understandable we call any software that interacts on the fabric an [*agent*][agent]. Each app, user, or database-- anything that exchanges a [message][message] over the fabric is called an agent.

### Register/Call

[Register/Call](/pages/riffle/RegisterCall.md) is the first messaging pattern. Its the most similar to locally running code. The agent that hosts the function, or has it implemented in their program, can *register* it and expose it to other agents on the fabric. Those other agents then *call* the function, valid parameters and receiving the return value of the function.

```
# App 1:

# The useful function
int add(int one, int two) {
    return one + two
}

# Expose the function to the outside world under the name "add"
register("add", add)
```

```
# App 2:

# Call the function
int x = call("add", 4, 5)

print(x) # Writes out 9
```

In the example above App 1 and App 2 can be anywhere in the world. Although the sample is written in pseudocode, as long as both apps use Riffle the languages they actually can be anything!

Only one program can register a function at a time. Anyone who's allowed to call the function may do so, but we'll get into exactly what *allowed* means in the security section.

### Publish/Subscribe

Publish/Subscribe, or [*PubSub*](/pages/riffle/PubSub), is the second messaging pattern currently built into riffle. Like register/call, it allows a program to pass values into a method in some other piece of code somewhere in the world. Its not, however, limited to one caller and one callee. Any number of agents can *subscribe* to a topic with a string and receive all of the *publishes* produced by other agents.

```
# App 1, 2, and 3

# Messages arrive here
int echo(name string) {
    print(name)
}

# Expose the function to the outside world under the name "add"
subscribe("echo", echo)
```

```
# App 4:

# Publish some content
publish("echo", "Hello!")

# Apps 1, 2, and 3 print: 
# "Hello!"
# "Hello!"
# "Hello!"
```


## Type Guarantees

To be fair to all the smart developers who came before us and tried to solve this problem, the messaging patterns are not novel, or new. Many other software libraries and platforms the focus on *RPC*, or remote procedure call, implement similar patterns. One of the interesting things riffle does give you is *type safety.* This means the following conditions hold for all messages passed over the fabric: 

1. The number of arguments passed at the sender matches the number of arguments expected at the receiver. 
2. Argument types are the same on both ends
3. Objects are transfered across the gap between the programs seamlessly and magically (as long as they adhere to some simple rules.)

If a sender passes the wrong number of arguments or the wrong kinds of arguments they'll get an exception, much the same as if they called a local method with incorrect parameters. 


## Sessions

A [*session*][session] is IN PROGRESS AAHHHH.

Connection abstraction

[As useful as riffle is, its nothing without a fabric to run on.](/pages/tour/Fabric.md)

<!-- Reference for TOC -->

[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md