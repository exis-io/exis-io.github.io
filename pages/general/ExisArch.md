# Exis Architecture

Exis is a combination of three components that make writing next-generation apps incredibly simple. Together, these components should simplify *all* aspects of your application, not just backend logic, not just database access - all of it.


The three components are:
* A protocol for communication called [Riffle][riffle]
* A network [Fabric][fabric] to route communication 
* [Appliances][appliances] to host developer's code.

Together these standardize networking best practices and simplify the design and implementation of distributed applications. 

![Exis Overview](/img/exis_docs_overview.svg)


Modern apps are highly interwoven - between not only backend components like databases and authentication, but even between      users of the app.

Any app written today contains two parts: the code you are interested and excited to write, and the boilerplate code that is required to make your app function. The interesting thing is that often times this boilerplate code can be more difficult and error-prone than your actual app itself! We take difficult, error-prone, and boilerplate code and   completely strip it away leaving only the application logic behind. This is possible by combining the best aspects of modern communication frameworks into one all-powerful solution that we call Exis.



## The 10 Rules

1. Beautiful is better than ugly.

2. There should be one-- and preferably only one --obvious way to do it.

3. Require less [lines of code, complexity, required knowledge].

4. Security is not a feature. 

5. Choice of language doesn't affect functionality.

6. Be decentralized.

7. Be scalable. 

8. Explicit is better than implicit.

9. Simple is better than complex.

10. Special cases aren't special enough to break the rules. 


[riffle]:/pages/installing/gettingStarted.md


A brief description of all the components that make up the Exis platform. 

## Fabric

A collection of [nodes][node] and [appliances][appliances] that act as a software platform for developing applications. All programs connected to the fabric are called [domains][domains], which exchange messages between them through a protocol called [riffle][riffle]. Programs are said to *connect* to the fabric.

Plainly speaking, the fabric gets messages from one place to another.

### The Node

[*Nodes*][node] make up most of the fabric. They are pieces of software that coordinate between all domains and enforce the rules of the fabric. You don't have to worry about nodes too much unless you're going to develop core infrastructure. Just know that at the end of the day, nodes do the heavy lifting for you.

All domains connect to a node when they begin interacting with the fabric. There's always at least one node at ```node.exis.io```.

### Domains

The most important part of working with the fabric is understanding where things are and how to reach them. Remember that each piece of software, each application that communicates over the fabric is called an [domain][domains]. Each of those domains has a [*domain*][domains], or a name that anyone can use to find that domain. 

Here are some quick and simple rules for dealing with domains:

* Each domain is unique
* Each domain refers to a program on the fabric
* A domain can belong to another domain. The owner is called a *superdomain* and the owned is called a *subdomain.*
* Domains are separated from their subdomains with a dot
* The top level domain is the owner of the fabric
* A domain owns and generally has control over everything in their subdomains

The top level domain is special. Since the node software is open source, anyone can run their own fabric. The top level domain is the name of the owner of the fabric, usually shortened to two letters. We, as Exis, run a primary version of the fabric where the top-level domain is ```xs```.


### Actions

If domains are the names of domains, then [*actions*](/pages/riffle/Action.md) are what they can do. You can think of domains as nouns and actions as verbs. An action always begins with a forward slash. Actions can have subactions similar to subdomains but without the concept of ownership. Subactions are separated by a forward slash (`/`). 

A basic action: 

```
/hello
```

One subaction:

```none
/hello/there
```

### Endpoints

The last piece of the puzzle not mentioned above is the [*endpoint*][endpoint].
Endpoints aren't anything special, just a domain with an action together: a verb with a noun. 

Remember `thenextfacebook` app our user `joebob` made? Lets combine it with the basic action from the section above:

```
xs.joebob.thenextfacebook/hello
```

Any domain on the fabric can send a message to this endpoint (as long as they have the proper permissions). Exis will route the message to the app `thenextfacebook`. The method called within the app for this endpoint depends specifically on the application.


## Riffle

<sub>*A riffle is a short, relatively shallow and coarse-bedded length of stream over which the stream flows at slower velocity but a higher turbulence than it normally does in comparison to a pool.*</sub>

Riffle is the protocol all [domains][domain] use to communicate with one another. Every program adds riffle code, or the *client libraries*, to their projects. It runs atop [websockets](http://www.html5rocks.com/en/tutorials/websockets/basics/). 

### General

Riffle is a protocol and client-side library that makes network code look like any other local code.

Its the primary way developers interact with the Fabric. Riffle helps move your data around, the fabric actually does the moving. As much as possible, it strives to reduce all networking code down to one line: something that looks much like a method call. A developer shouldn't have to deal with redundant code, code they may not understand, or complex protocols. Of course, none of this is bought at the expense of complexity! Under the hood, all the same kinds of code are running and handling the gritty details.

Riffle provides an interface for interacting with all software on the [fabric][fabric]. Its here to make your life easier by making conventions and common practices rock solid. Riffle handles the following:

1. Type guarantees
2. Serialization
3. Connection Management
4. Authentication
5. Addressing


### Message Patterns

Getting information from one place in a program to one place in another program: that's what networking code does. The rest of the code enables or protects that process. 

With Riffle we want to deal only with the high level operations, or sending a [message][message] from one application to another. You can exchange messages between applications in different ways called *message patterns.* 

__Definition:__ In software development, a pattern (or design pattern) is a general solution to a design problem that recurs repeatedly in many projects. Software designers adapt the pattern solution to their specific project. Patterns use a formal approach to describing a design problem, its proposed solution, and any other factors that might affect the problem or the solution. A successful pattern should have established itself as leading to a good solution in three previous projects or situations.

In order to keep all of our terms consistent and understandable we call any software that interacts on the fabric an [*agent*][agent]. Each app, user, or database-- anything that exchanges a [message][message] over the fabric is called an agent.

### Register/Call

[Register/Call](/pages/riffle/RegisterCall.md) is the first messaging pattern. Its the most similar to locally running code. The agent that hosts the function, or has it implemented in their program, can *register* it and expose it to other agents on the fabric. Those other agents then *call* the function and receive the return value of the function.

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

In the example above App 1 and App 2 can be anywhere in the world. Although the sample is written in pseudocode, as long as both apps use Riffle, the languages can actually be anything!

Only one program can register a function at a time. Anyone who's allowed to call the function may do so, but we'll get into exactly what *allowed* means in the security section.

### Publish/Subscribe

Publish/Subscribe, or [*PubSub*](/pages/riffle/PubSub), is the second messaging pattern currently built into riffle. Like register/call, it allows a program to pass values into a method in some other piece of code somewhere in the world. It's not, however, limited to one caller and one callee. Any number of agents can *subscribe* to a topic with a string and receive all of the *publishes* produced by other agents.

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


### Cumin

Cumin is a communication pattern and library that provides type safety from any data passed into riffle domains. It guarantees that functions are only called with the right number and type of arguments, even if those arguments are objects. 

To be fair to all the smart developers who came before us and tried to solve this problem, the messaging patterns are not novel, or new. Many other software libraries and platforms that focus on *RPC*, or remote procedure call, implement similar patterns. One of the interesting things riffle does give you is *type safety.* This means the following conditions hold for all messages passed over the fabric:

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


## Appliances

[Appliances][appliances] are like software libraries in a traditional software project. They're small services that solve common problems you can add to your fabric-aware applications. *Appliances* are very similar to modern day *cloud services*. This means the owner of the fabric runs and manages the appliance software. Developers don't have to know how to run or maintain these complicated services, they just have to understand how to use them.

Appliances have to be **injected** to a developer's [domain][domains]. The developer does not gain access to the code of the underlying appliance. Each appliance has specific publicized endpoints that developers may used to interact with the appliance. 

An appliance should belong to the developer using it without giving that developer control of the appliance itself. Similarly, the creator of the appliance should not be able to access the developer's data in the appliance. 

Creators of an appliance should be able to charge for usage using a predetermined payment structure. The creators should not have to implement the payment scheme themselves. 

Developers should be able to add appliances to their domain.

## Security

Exis integrates common network security patterns, including authorization, authentication, protection of live communication, and protection of static data. A Public Key Infrastructure underpins the security model. 

If you saw [the 10 rules](/pages/general/Home.md#the-10-rules) on the home page you may have noticed `security is not a feature`. Security is a tricky topic. On one hand, networked applications can't get by without implmenting security these days. On the other hand security topics tend to be complicated to understand and code. 

### Decentralized 

One of the key tenants of Exis is its decentralized nature. While many existing platforms enable security like we do, our focus is on the scalability of this security. This means there is no centralized point of access (read: point of failure) for the Fabric.

### Authentication

Unlike the internet, access to the Fabric is controlled. This enables developers to know they can only talk to things that have been authenticated to the network, thus simplifying their verification requirements. A secondary aspect is the idea that any agent communicating on the fabric has an associated identification, making it easier to target endpoints while writing apps (ie. every time you log onto the internet your IP address can change, but every time you access the fabric your ID will always be `xs.joebob`).

[Domains][domains] all have to be authenticated by an application before they can use the fabric. They exchange credentials, which can be usernames, passwords, or any other identifying information, with an [**Auth**][auth] appliance. Out of the box, *Auth* appliances handle the base cases for user authentication. They can also be customized by the developer to handle any odd cases.

### Permissions

A permission is the declaration that a user or application is allowed to make a call. This functionality is something the internet sorely lacks-- the ability for receivers to reject traffic!



<!-- ### Riffle Model

A base class for models that allows them to be transmitted. It does not expose an obvious public interface except for the following:

* autogenerated `riffleId` 
* `toString` override  -->


__TOCTAGS__
