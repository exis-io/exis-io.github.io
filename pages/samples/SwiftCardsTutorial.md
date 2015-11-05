# iOS Tutorial- Cards Against Humanity 

Note: Xcode `7.1` introduces some issues with Cocoapods, the dependency manager. If you're using this version you may have to do some of these steps differently.  Check your version of xcode: 

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/3.png)


Cards Against Humanity can't be played peer to peer. Any player with the app could change the code and lie about the cards they have or the cards they're going to play! 

## Creating a new iOS App with Riffle

Create a new empty iOS project. Select `Single View Application`. 

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/1.png)

Enter a name for your new application. You don't have to enter the same name as shown in the image here. Remember the folder where you save the project, you'll need to find it again soon!

In this tutorial we've named the project `ExiAgainst` and saved it into the directory `~/Documents/ios/`.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/2.png)

The riffle libraries are distributed as `pods` through cocoapods. Check out more information about cocoapods at their [website](https://cocoapods.org/). 

If you don't have cocoapods installed, now would be a good time. Follow the instructions on the home page from the link above. Cocoapods relies on `RubyGems`, a dependency manager for the ruby language. You'll need that too. 

In order to install riffle you'll first have to make a `Podfile`. You can either use your favorite text editor for this or the built in TextEdit app available in OSX. The example below shows TextEdit-- you'll need to save it as plaintext if you use this!

Enter this into the `Podfile`: 

```
# Tell cocoapods what kind of application we're making
platform :ios, '9.0'

# Required when libraries have swift code in them 
use_frameworks!

# The dependency we want to use. You can add more here if you'd like!
pod 'Riffle'
```


![Missing Image!](/img/ios-cards-tutorial/app/1-setup/4.png)

Save the file as `Podfile` (with no extension!) in the same directory that you made your project.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/5.png)

Cocoapods is used through the command line, or `Terminal` application in OSX. Find it in the application window or spotlight. Once open, you'll need to navigate to the directory where you saved the project. 

Change directory to the save location of the project. The second part of the command may be different for you if you saved the project to a different directory!

```
cd ~/Documents/ios/ExAgainst
```

Once in the directory instruct cocoapods to fetch all dependencies. This will load all the libraries you'll need to use for this project. 

```
pod install
```

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/6.png)

Close any open Xcode windows you may have open. Cocoapods doesn't just copy code into your project, it creates new projects for each component and combines them into a `workspace`. Don't worry, everything should look the same! Navigate to the folder you saved the project in and open the `.xcworkspace` file-- not the `.xcproject`!

Here's what the newly created project looks like. Note the `Pods` project below your project in the file navigator. Import riffle by adding the import to the top of the view controller: 

```
impot Riffle
```

Run the project and make sure it builds.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/7.png)

__Note:__ May have to set `embedded swift code` to `Yes` in the pods target if riffle can't be found. 

__Note:__ if you see an error on build and you have Xcode 7.1 you'll need to setup a quick workaround. Open the finder and navigate to the project folder. Delete the directory `Pods/Headers/Private` and rebuild. 


## Setting up OSX App

The process for setting up an OSX application is the same as for the iOS version. Make sure to choose `OSX Application` on the left pane in the new project wizard and `Command Line Tool` in the right pane.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/8.png)

Repeat the same steps as for the iOS application. You'll need to tweak the `Podfile` to tell cocoapods about our platform: 

```
platform :osx, '10.10'

use_frameworks!

pod 'Riffle'
```

Once the dependencies are installed and you have the workspace open go ahead and run the project. You should see `Hello, World!` appear in the console log. You should ignore the error warnings that appear above it. Unfortunately, Swift libraries and OSX applications don't play nicely just yet. Its still a very new language, and there are some kinks to work out!

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/9.png)

## Website Setup

You control the way you interact with Exis through a web interface. This includes creating applications, setting security details, and adding appliances to your applications. 

We have to perform some basic setup before we can make our Hello, World exis application. Head over to [dev.exis.io](http://my-dev.exis.io).

This section is deferred in the hope I'll have time to do UI work. 

<!-- ![Missing Image!](/img/ios-cards-tutorial/web/1-setup/1.png)
![Missing Image!](/img/ios-cards-tutorial/web/1-setup/2.png)
![Missing Image!](/img/ios-cards-tutorial/web/1-setup/3.png)
![Missing Image!](/img/ios-cards-tutorial/web/1-setup/4.png)
![Missing Image!](/img/ios-cards-tutorial/web/1-setup/5.png)
![Missing Image!](/img/ios-cards-tutorial/web/1-setup/6.png) -->


## Hello, Riffle

The projects should be set up and ready to run, but lets take a quick break for a `Hello, World!`. You'll register a function in the OSX app and call it from the iOS app.

Remember that the OSX project will eventually run persistently in the cloud. For now, you can test with the app running locally. Because the OSX app will run in a container, we'll refer to it as the *backend* or *container* interchangeably from here on out. 

Add the following code to `main.swift` in the OSX app. You should enter your app's domain in the Session constructor. 

TODO: replace the domain asked for with the user's domain or app domain. 

```
import Foundation
import Riffle

let token = "Wu0e09SPA2mTEh9MJu3BggX/6H8YxV8EJFxZrqhlF/oD6g15UtJoDoDclGdCC8p8V4T4RxDCWiWJ7QJ+UWni+OXMSUWYxNOAj/UkpzeBhUXrg8qAPyLdVXjzb+HdR6+lHSO60DJbhlhI0jOuR76iW141RjMlr6ggIUuBxTR+A1o="

class Session: RiffleSession {
    override func onJoin() {
        print("Session joined")
        
        register(self.domain + "/hello", sayHi)
        
    }
    
    func sayHi(name: String) -> AnyObject {
        print("\(name) says hello!")
        return "Hi, \(name)!"
    }
}

let session = Session(domain: "xs.demo.damouse.exagainst.container")
session.token = token
session.connect()
NSRunLoop.currentRunLoop().run()
```

In the iOS app add a button to the empty view controller created when you made the project. Create an action for the button to its parent view controller. In the example below the action is called *go*, but you can name it whatever you'd like. Dont worry if you have more code in your view controller than is shown in this image. 

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/1.png)

Add the following code to your view controller. Again, be sure to change all the domains written out here to match your domain. 

```
class ViewController: UIViewController, RiffleDelegate {
    var session: RiffleSession?
    
    @IBAction func go(sender: AnyObject) {
        session = RiffleSession(domain: "xs.demo.damouse.exagainst.userone")
        session!.delegate = self
        session!.connect()
    }

    func onJoin() {
        print("Session joined!")
        print("Sending a greeting to the backend!")
        
        session!.call("xs.demo.damouse.exagainst/hello", self.session!.domain) { (greeting: String) -> () in
            print("The backend replied with \(greeting)")
        }
    }
    
    func onLeave() {
        print("Session left!")
    }
}

```

Run both your apps. Watch the output of the container-- once you see that its session has connected with `Session Joined!` touch the button you added to your app. If you see the name of the app passed to the container and back, celebrate-- you've successfully written your first exis enabled application!

Here's some sample output from an app on the left and a container on the right. 

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/2.png)

## User Login

Look at the app code carefully. Notice something a little strange? Domains are the names of applications on the fabric, but we're setting ours manually. Since domains have to be exclusive, only one copy of the app can be running at one time. In this section we'll add some very basic user registration. 

There are a few levels of authentication, each based on how secure the developer wants the app to be. For this app we will only require a user's name for registration and keep it around only as long as the user stays on the app. 

The user needs a way to input their name. Add a textfield to your view controller and create an `Outlet` for the textfield. Call this outlet `textfieldUsername`.

![Missing Image!](/img/ios-cards-tutorial/app/3-auth/1.png)

Now change the `go` method you created as an action for the button: 

```
    @IBAction func go(sender: AnyObject) { 
        // Make the keyboard go away       
        textfieldUsername.resignFirstResponder()
        let name = textfieldUsername.text!
        
        // Create the domain for this user based on the name they've submitted
        session = RiffleSession(domain: "xs.demo.damouse.exagainst." + name)
        session!.delegate = self
        session!.connect()
    }
```

Lets give the app the ability to start playing. Remember that the container is going to run all the Cards Against rounds as the game goes on. In this app we're going to call each group of players in play a `Room.` The room is going to keep track of the cards and players in play at once and handle the actual gameplay. The container is responsible for creating rooms and assigning users to them. 

`Rooms` need to know when players leave the app or their room-- they have to remove them from play. Ideally the player should let their rooms know when they leave the game, but we still have to check for silent disconnections from the user. 

TODO: move this to the general docs and link to it. 
Thankfully the node will provide. When an agent disconnects from the fabric, the node they were connected to publishes a special message *in its parent domain.* This message is published to the action `/sessionLeft`.

In the container `Session` object you previously made, add the following line to `onJoin`, where *domain* is the domain of your app. 

```
session.subscribe(domain + "/sessionLeft", sessionLeft)
```

The `sessionLeft` argument passed as the last argument to the subscribe method is a pointer to a function. You'll also need to implement the function:

```
func sessionLeft(domain: String) {
    print("Session left: \(domain)")
}
```

As the name implies, we should see this method get called when any user leaves the app. Go ahead and try it out. Once the app is connected and authenticated terminate the app and watch the console output for the container. 

![Missing Image!](/img/ios-cards-tutorial/app/3-auth/2.png)

## Passing Data

We're missing the actual cards in our card game! Time to fix that. In this section you'll load cards from static files on the container and send them across to the user. 

Riffle provides a useful wrapper model named *RiffleModel*. These classes are special-- you don't have to manually serialize them to send them to other agents. 

TODO: check the multi target config again, or try the multiple project config here. If it fails, explain the shared code. 

Unfortunatly, there's an important limitation to keep in mind when working with RiffleModels in Xcode. Sadly, the process of working with two targets, or apps, in the same Xcode project is a little buggy right now. When an agent receives a RiffleModel it has to have the definition of the class in the same project. This means you'll need to create the Class twice, once for the container and once for the app. 

Create a new class in both projects. Name it *Card*, make sure it inherits from RiffleModel, and give it one property: a string called *text.*

![Missing Image!](/img/ios-cards-tutorial/app/4-data/1.png)

The object represents the data, but we still have to build the data. Download the data for the cards [here](/img/pg13.zip). Unzip the file and drag it into your project. Make sure to select *Copy items if needed* and make sure *Add to targets* is checked for your project. 

![Missing Image!](/img/ios-cards-tutorial/app/4-data/2.png)

![Missing Image!](/img/ios-cards-tutorial/app/4-data/3.png)

When you drag in static content like *JSON* into Xcode it doesn't always copy the content over with your project. In order to make sure your app can see the cards data you'll have to make sure it is correctly copied over 

1. Go to your project's settings by clicking the blue icon in the top left of the project navigation
2. Enter the *Build Phases* Section
3. Open the *Copy Items* section
4. Set *Destination* to *Resources*
5. Make sure the *subpath* textfield is empty
6. Uncheck *Copy only when isntalling*

Because each room is going to be a different game of Cards Against, each room should have their own deck of cards, represented by a *Deck* object. This model is responsible for tracking cards in play, dealing cards, and shuffling them back into the deck for reuse. 

Create a file for the new Deck class. It won't be passed along to the players in the game, so no need to have it subclass RiffleModel.

```
import Foundation
import Mantle

class Deck {
    var questions: [Card] = []
    var answers: [Card] = []
    
    init(questionPath: String, answerPath: String) {
        let load = { (name: String) -> [Card] in
            let jsonPath = NSBundle.mainBundle().pathForResource(name, ofType: "json")
            let x = try! NSJSONSerialization.JSONObjectWithData(NSData(contentsOfFile: jsonPath!)!, options: NSJSONReadingOptions.AllowFragments) as! [[String: AnyObject]]
            
            return try! MTLJSONAdapter.modelsOfClass(Card.self, fromJSONArray: x) as! [Card]
        }
        
        questions = load(questionPath)
        answers = load(answerPath)
    }
    
    init(deck: Deck) {
        questions = deck.questions
        answers = deck.answers
    }
}
```

*Deck*'s initializer accepts two arguments, one for the name of the JSON file (without the *.json* extension!) containing the questions, and the other for the answers. Instantiate the *Deck* in *main.swift* and check its contents:

```
var deck = Deck(questionPath: "q13", answerPath: "a13")
print(deck.questions)
```

If you see a listing of Card objects then the deck loaded successfully-- if not then there may be something wrong with your project's configuration. Now lets get this content to the iOS app. 

Delete the deck testing code and move the deck instantiation into the Session class as an instance variable. Make a new method in the OSX's *Session* class for apps to call when they're ready to start playing. Return all the answers in the deck.


```
func play(domain: String) -> AnyObject {
    return deck.answers
}
```




TODO: this content belongs in the rest of the docs, not here. 
Traditional network communication requires you to *serialize* objects, or convert them to a format that any programming language can understand. Usually mobile apps use a format called *JSON* to do this. A RiffleModel can be sent to another agent on the fabric without explicit 

TODO: Find a home for me. 
Go ahead and make a new class for the Room object now. This class should belong in the container, not the app. 

TODO: If the auth content isn't finished here skip the bit on creating the user role-- You can try and test your app out, but sadly you won't get very far for now. In order for you to call to the container, you'll need *permission* from the container. 

