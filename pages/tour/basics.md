# Exis Basics

Exis helps developers write next-generation apps by removing the boilerplate code that is required when apps need to communicate. We created Exis because we realized that *communication happens all the time*... Unless you are creating a simple calculator you *will* need to communicate.

*If apps written today are like construction workers digging with shovels, then Exis is like handing them a stick of dynamite.*

Once you try out Exis you won't go back to the old way of programming. Try out our few basic lessons here and we think you'll agree - this is the future of app development.

### Exis works across many languages

Exis supports a growing set of languages that make it a powerful tool for all developers - from individuals, to development studios, to enterprises. Because of this, we have written our docs to support showing code in many languages side by side, like the following:

<exis-code name="Tour Basics 1" action="simple"></exis-code>

**This code is fully executable.** Go on and give it a try by clicking on the play button above in each language. This code executes in our *REPL Sandbox*, which means you can test and try out incredibly complicated functions right from your web browser across any of our supported languages *without downloading or installing anything*. How cool is that!?


### Exis is asynchronous

Here is the big leap that developers have to make. Communication pretty much necessitates the use of async code. It goes by many names in different languages (Deferreds in Python Twisted or Promises in NodeJS). Exis is built around the use of async code, like the following example:

<exis-code name="Tour Basics 2"></exis-code>

**Explanation:** The code on the left publishes values from 0 to 10 in rapid succession to a subscriber on the right. Each publish is sent *asynchronously* meaning you should **not** expect that the values will arrive to the subscriber in the proper order from 0 to 10. Also it should be noted that the values will not always arrive in the same order every time!!


### The full view

The following tour will show you every example use case of Exis you could possibly want to see. To keep things simple we only show the "actionable" code, of course there is a bit of setup even in Exis to get things working. Each code example that we will show you is wrapped up in the following code snippet (just so you know we aren't hiding anything).

<exis-code name="REPL Template" action="template" repl=false></exis-code>

Now that you have the basic ideas, let's get started with [Registers and Calls](/pages/tour/regcall-lesson1.md).