# Exis Architecture

# Fabric

A platform for handling riffle traffic. It connects all [domains][domain] together, exchanging [messages][message] between them.  

Plainly speaking, the fabric gets messages from one place to another.

The fabric is built from [nodes][Node]. They route messages from two [domains:][domain] the sender and the receiver. 

[Appliances][Appliances] are discrete programs that expose some important functionality to developers and users on the fabric. The core appliances together with the routers make up the fabric itself. 

## General

### The Node

[*Nodes*][node] make up most of the fabric. They are pieces of software that coordinate between all domains and enforce the rules of the fabric. You don't have to worry about nodes too much unless you're going to develop core infrastructure. Just know that at the end of the day, nodes do the heavy lifting for you.

All domains connect to a node when they begin interacting with the fabric. There's always at least one node at ```node.exis.io```.

### Domains

The most important part of working with the fabric is understanding where things are and how to reach them. Remember that each piece of software, each application that communicates over the fabric is called an [domain][domain]. Each of those domains has a [*domain*][domain], or a name that anyone can use to find that domain. 

Here are some quick and simple rules for dealing with domains:

* Each domain is unique
* Each domain refers to an domain on the fabric
* A domain can belong to another domain. The owner is called a *superdomain* and the owned is called a *subdomain.*
* Domains are separated from their subdomains with a dot
* The top level domain is the owner of the fabric
* A domain owns and generally has control over everything in their subdomains

The top level domain is special. Since the node software is open source, anyone can run their own fabric. The top level domain is the name of the owner of the fabric, usually shortened to two letters. We, as Exis, run a primary version of the fabric. The top level domain is:

```
xs
```

If you decide to sign up as a user named *joebob* you get the subdomain:

```
xs.joebob
```

Go ahead and create a new app *thenextfacebook* and you'll get the name:

```
xs.joebob.thenextfacebook
```

## Actions

If domains are the names of domains, then [*actions*](/pages/riffle/Action.md) are what they can do. You can think of domains as nouns and actions as verbs. An action always begins with a forward slash. Actions can have subactions similar to subdomains but without the concept of ownership. Subactions are separated by a forward slash (`/`). 

A basic action: 

```
/hello
```

One subaction:

```none
/hello/there
```

## Endpoints

The last piece of the puzzle not mentioned above is the [*endpoint*][endpoint].
Endpoints aren't anything special, just a domain with an action together: a verb with a noun. 

Remember `thenextfacebook` app our user `joebob` made? Lets combine it with the basic action from the section above:

```
xs.joebob.thenextfacebook/hello
```

Any domain on the fabric can send a message to this endpoint (as long as they have the proper permissions). Exis will route the message to the app `thenextfacebook`. The method called within the app for this endpoint depends specifically on the application.


# Riffle

<sub>*A riffle is a short, relatively shallow and coarse-bedded length of stream over which the stream flows at slower velocity but a higher turbulence than it normally does in comparison to a pool.*</sub>

Riffle is the protocol all [domains][domain] use to communicate with one another. Every program adds riffle code, or the *client libraries*, to their projects. It runs atop [websockets](http://www.html5rocks.com/en/tutorials/websockets/basics/). 

## General

Riffle is a protocol and client-side library that makes network code look like any other local code.

Its the primary way developers interact with the Fabric. Riffle helps move your data around, the fabric actually does the moving. As much as possible, it strives to reduce all networking code down to one line: something that looks much like a method call. A developer shouldn't have to deal with redundant code, code they may not understand, or complex protocols. Of course, none of this is bought at the expense of complexity! Under the hood, all the same kinds of code are running and handling the gritty details.

Riffle provides an interface for interacting with all software on the [fabric][fabric]. Its here to make your life easier by making conventions and common practices rock solid. Riffle handles the following:

1. Type guarantees
2. Serialization
3. Connection Management
4. Authentication
5. Addressing


## Message Patterns

Getting information from one place in a program to one place in another program: that's what networking code does. The rest of the code enables or protects that process. 

With Riffle we want to deal only with the high level operations, or sending a [message][message] from one application to another. You can exchange messages between applications in different ways called *message patterns.* 

__Definition:__ In software development, a pattern (or design pattern) is a general solution to a design problem that recurs repeatedly in many projects. Software designers adapt the pattern solution to their specific project. Patterns use a formal approach to describing a design problem, its proposed solution, and any other factors that might affect the problem or the solution. A successful pattern should have established itself as leading to a good solution in three previous projects or situations.

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

# Expose the function to the outside world under the name "echo"
subscribe("echo", echo)
```

```
# App 4:

# Publish some content to "echo"
publish("echo", "Hello!")

# Apps 1, 2, and 3 print: 
# "Hello!"
# "Hello!"
# "Hello!"
```


## Cumin

Cumin is a library that provides type safety from any data passed into riffle domains. It guarantees that any function always received the types it expects. 

To be fair to all the smart developers who came before us and tried to solve this problem, the messaging patterns are not novel, or new. Many other software libraries and platforms the focus on *RPC*, or remote procedure call, implement similar patterns. One of the interesting things riffle does give you is *type safety.* This means the following conditions hold for all messages passed over the fabric: 

1. The number of arguments passed at the sender matches the number of arguments expected at the receiver. 
2. Argument types are the same on both ends
3. Objects are transferred across the gap between the programs seamlessly and magically (as long as they adhere to some simple rules.)

If a sender passes the wrong number of arguments or the wrong kinds of arguments they'll get an exception, much the same as if they called a local method with incorrect parameters. 

When communicating over the fabric you can only send the following primitive types directly:

* Int
* String
* Bool
* Float
* Double

Collections and Objects must be composed of the primitives above. These are:

* RiffleModel
* Array
* Dictionary

<!-- ## Sessions
Since Riffle provides a persistent connection to the Fabric, it makes sense to wrap this connection around the concept of a session. This session enables the developer to write object oriented code while being cognizant of the fact that it is actually networking code underneath the hood.

What we mean by this is that endpoints can be grouped into logical components (code related to the user versus code related to game logic) and represented as individual objects. As connections to the Fabric come and go, the code required to maintain these connections is abstracted away from the developer through the use of these sessions.
 -->

## Examples

#### Installation

*Abstract*: use your favorite package manager.

* *Python*: pip
* *Swift*: cocoapods 

#### Configuration

Riffle configuration is handled through static methods on the riffle library. 


```go
// Set the url to connect to. Defaults to *node.exis.io*
func setFabric(string, url)

// Prints internal logging messages
func setDebugging()

print('asdf')
```


#### Riffle Model

A base class for models that allows them to be transmitted. It does not expose an obvious public interface except for the following:

* autogenerated `riffleId` 
* `toString` override 



[message]:/pages/riffle/Message.md
[agent]:/pages/riffle/Agent.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md
[samples]:/pages/samples/Samples.md

[auth]:/pages/appliances/Auth-Appliance.md
[perm]:/pages/security/Permission.md

<!-- Reference for TOC -->

[message]:/pages/riffle/Message.md
[node]:/pages/fabric/Node.md
[fabric]:/pages/fabric/Fabric.md
[domain]:/pages/riffle/Domain.md
[action]:/pages/riffle/Agent.md
[endpoint]:/pages/riffle/Endpoint.md
[Riffle]:/pages/riffle/Riffle.md

[appliances]:/pages/appliances/Appliances.md
[store]:/pages/appliances/Store-Appliances.md
[core]:/pages/appliances/Core-Appliances.md
[container]:/pages/appliances/Container-Appliances.md
[gateway]:/pages/appliances/Gateway-Appliances.md
