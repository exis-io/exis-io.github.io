# An Exis Tour

Networked code is some of the most complicated and error prone code in most applications. It takes up a lot of time, effort, and lines and most people don't do it perfectly-- its hard! You can be an expert with a language on a given platform and make incredible software, but when you decide to take that application to the internet a whole new suite of skills is required. 


1. Data interchange formats: XML, JSON
2. Protocols: HTTP or socket-based communication
3. Networking: IP and DNS addressing
4. Security: secure communication and data storage, authentication
5. API Design: REST, SOAP, and design security
6. Sever Design: concurrency, reliability, and scalability  


You could spend a whole career specializing in just one of these topics! As software developers in this day and age, where software design and tools are more and more powerful, where we're expected to be experts in multiple fields all the time, how can we write better network code? The better question is actually __why do we keep writing networking code__?

## The Solution

Fundamentally networking code is method calling. You as a user write code for you application that wants to execute code that lives somewhere else- all the complexity and knowledge involved in writing modern network code simply enables this process. This is our first key observation. The second is that a global and universal method for writing all networking code requires some conventions-- it is some consistent set of rules that all developers can follow. The final useful insight is that modern applications are built out of reusable, distributed services that are spread all around the internet.

In order to make this happen we use three broad categories of software, the **Fabric** service, the **Riffle** protocol, and **Appliance** services. 

In this tour will cover a high-level, 30,000 feet overview of the exis offering. You'll understand why we don't want to make network code beautiful-- we want to stop writing it entirely. Each section of the tour you'll find links to the specification of each components and at the end you can scope out our samples. Don't worry about the specifications for now, they're a little more in-depth. 

[First, lets look at traditional distibuted applications](/pages/tour/OldSchool.md)

