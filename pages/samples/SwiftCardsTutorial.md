# iOS Tutorial- Cards Against Humanity 

__Definition:__Cards Against Humanity is a party game in which players complete fill-in-the-blank statements using mature-content phrases printed on playing cards. The game is available as a free download that players can print to create their own cards, and also available to purchase in published hardcopy. Its development originated from a successful Kickstarter campaign and has received acclaim for its simple concept backed up by its satirical, mature content. The game is available under a non-free Creative Commons license BY-NC-SA https://en.wikipedia.org/wiki/Cards_Against_Humanity

In this tutorial you'll be building an iOS version of Cards Against Humanity that runs over the fabric with a backend written entirely in Swift. 

Cards Against is played between a set of peers, so it seems like the game should be able to run peer to peer, or each player communicating directly with other players. Like all cards games, however, we have to watch out for cheaters! In order to maintain the state of the game and make sure play is fair we'll rely on a *container*, or a program running in the cloud. This container will fufill the role traditionally filled by web servers. 

Lets get going!

## Creating a new iOS App with Riffle

Create a new empty iOS project. Select `Single View Application`. 

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/1.PNG)

Enter `ExAgainst` as the name for your new application. Remember the folder where you save the project, you'll need to find it again soon! Here we've saved it into the directory `~/Documents/ios/`.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/2.PNG)

The riffle libraries are distributed as `pods` through cocoapods. Check out more information about cocoapods at their [website](https://cocoapods.org/). To check if you have cocoapods installed, open the *Terminal* application and type `pod`. If you see something like this (the colors may not match) then you're ready to go with cocoapods.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/10.PNG)

If you don't have cocoapods installed, now would be a good time. Follow the instructions on the home page from the link above. Cocoapods relies on [RubyGems](https://rubygems.org/pages/download), a dependency manager for the ruby language. You'll need that too. 

In order to install riffle you'll first have to create a `Podfile`. This is a simple text file that lists dependencies in Ruby. You can either use your favorite text editor for this or the built in TextEdit app available in OSX. The example below shows TextEdit. Be cafeul-- if you use TextEdit you'll need to convet it to *plaintext* before saving it.

Enter this into the `Podfile`: 

```
# Tell cocoapods what kind of application we're making
platform :ios, '9.0'

# Required when libraries have swift code in them 
use_frameworks!

# The dependency we want to use. You can add more here if you'd like!
pod 'Riffle'
```


![Missing Image!](/img/ios-cards-tutorial/app/1-setup/4.PNG)

Save the file as `Podfile` (with no *.txt* extension!) in the same directory that you made your project.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/5.PNG)

Cocoapods is used through the command line, or `Terminal` application in OSX. Find it in the application window or spotlight. Once open, you'll need to navigate to the directory where you saved the project. 

Change directory to the save location of the project. The second part of the command may be different for you if you saved the project to a different directory!

```
cd ~/Documents/ios/ExAgainst
```

Once in the directory instruct cocoapods to fetch all dependencies. This will load all the libraries you'll need to use for this project. 

```
pod install
```

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/6.PNG)

Close any open Xcode windows you may have open. Cocoapods doesn't just copy code into your project, it creates new projects for each component and combines them into a `workspace`. Don't worry, everything should look the same! Navigate to the folder you saved the project in and open the `.xcworkspace` file-- not the `.xcproject`!

Here's what the newly created project looks like. Note the `Pods` project below your project in the file navigator. Import riffle by adding the import to the top of the view controller: 

```
import Riffle
```

Run the project and make sure it builds.

__Warning:__ Xcode sometimes gets a little lost and reports errors when none exist. Try building even if an eror appears. Once it goes through the process of building the libraries the errors may dissapear.

__NOTE:__ Xcode `7.1` introduces some issues with Cocoapods, the dependency manager. If you see errors relating to `import of non-modular header...` you will have to delete the `Pods/Headers/Private` folder from your project directory. Check your version of xcode: ![Missing Image!](/img/ios-cards-tutorial/app/1-setup/3.PNG)

 

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/7.PNG)

<!-- __Warning:__ May have to set `embedded swift code` to `Yes` in the pods target if riffle can't be found.  -->

__NOTE:__ if you see an error on build and you have Xcode 7.1 you'll need to setup a quick workaround. Open the finder and navigate to the project folder. Delete the directory `Pods/Headers/Private` and rebuild. 


## Setting up OSX App

The process for setting up an OSX application is the same as for the iOS version. Make sure to choose `OSX Application` on the left pane in the new project wizard and `Command Line Tool` in the right pane.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/8.PNG)

Repeat the same steps as for the iOS application. You'll need to tweak the `Podfile` to tell cocoapods about our platform: 

```
platform :osx, '10.10'

use_frameworks!

pod 'Riffle'
```

Once the dependencies are installed and you have the workspace open go the project. Add `import Riffle` to the top of *main.swift* and run the project. You should see `Hello, World!` appear in the console log. Don't worry about the error warnings that appear above it. Unfortunately, Swift libraries and OSX applications don't play nicely just yet. Its still a very new language, and there are some kinks to work out!

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/9.PNG)

The last step in setting up the OSX app is to let Xcode know the *Riffle* libraries contain swift code. If you ever see errors like this:

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/3.PNG)

Then you forgot to do this step. 

1. In the left-side pane, or the *Project Navigator*, click on the *Pods* project with the blue icon. 
2. Select the `Riffle` target on the left side of the newly opened options pane. It has a yellow toolbox next to it.
3. Go to `Build Settings` 
4. Type in *"contains swift"* in the search bar on the options pane
5. Find the setting `Embedded Content Contains Swift Code` and set it to `Yes`

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/4.PNG)

## Website Setup

You control the way you interact with Exis through a web interface. This includes creating applications, setting security details, and adding appliances to your applications. 

We have to perform some basic setup before we can make our Hello, World exis application. Head over to [my.exis.io](http://my.exis.io).

Sign up for an account. For the *Signup Token* field enter `existest`. This will set you up for a 407 testing account.

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/1.PNG)

Navigate to the dashboard.

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/2.PNG)

Create a new application. The name you choose here will become part of your domain. Make sure to spell *exagainst* correctly. Be sure to check the *Auth* and *Osxcontainer* checkboxes!

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/3.PNG)

Once the app is created you should see the two appliances, *Auth* and *Osxcontainer* started up and running. 

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/4.PNG)

All messages over the fabric have to have [*Permissions*][perm]. This allows agents to send messages. For our *Hello, World!* we'll add a static permission that allows your app to call `hello` on the container. 

From the dashboard click on the blue *Permissions* button. Once on the permissions page, click *Create Static Role*.

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/5.PNG)

The endpoint is the destination of the function call, the container in our case. The agent is a hardcoded domain. 

Make sure to replace `damouse` in the domains below with your username! If your username is `joebob` your endpoint should read: 

```
xs.demo.joebob.exagainst.container/hello
```

And agent:

```
xs.demo.joebob.exagainst.userone
```

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/6.PNG)

Once you're finished, click on *Create Role*.

## Hello, Riffle

The projects should be set up and ready to run, but lets take a quick break for a `Hello, World!`. You'll register a function in the OSX app and call it from the iOS app.

Remember that the OSX project will eventually run persistently in the cloud. For now, you can test with the app running locally. Because the OSX app will run in a container, we'll refer to it as the *backend* or *container* interchangeably from here on out. 

Add the following code to `main.swift` in the OSX app. The `app` instance variable is a `RiffleAgent`. It accepts the domain of your app, make sure to substitute your own user domain instead of the one listed below!

For example, if your username is `joebob`, replace 

```
let app = RiffleAgent(domain: "xs.demo.damouse.exagainst")
```

with 

```
let app = RiffleAgent(domain: "xs.demo.joebob.exagainst")
```


```
import Foundation
import Riffle

// Replace "damouse" with your own username!
let app = RiffleAgent(domain: "xs.demo.damouse.exagainst")

class ContainerAgent: RiffleAgent {
    override func onJoin() {
        print("Agent joined")
        register("hello", sayHi)
    }
    
    func sayHi(name: String) -> AnyObject {
        print("\(name) says hello!")
        return "Hi, \(name)!"
    }
}

let container = ContainerAgent(name: "container", superdomain: app)
container.join()

NSRunLoop.currentRunLoop().run()
```

In the iOS app add a button to the empty view controller created when you made the project. Create an action for the button to its parent view controller. In the example below the action is called *go*, but you can name it whatever you'd like. Dont worry if you have more code in your view controller than is shown in this image. 

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/1.PNG)

Add the following code to your view controller. Again, replace the username listed in the domain with your own. 

```
import UIKit
import Riffle

class ViewController: UIViewController, RiffleDelegate {
    var app: RiffleAgent?
    var me: RiffleAgent?
    var container: RiffleAgent?
    
     @IBAction func go(sender: AnyObject) {
        
        app = RiffleAgent(domain: "xs.demo.damouse.exagainst")
        me = RiffleAgent(name: "userone", superdomain: app!)
        me!.delegate = self
        me!.join()
    }
    
    func onJoin() {
        print("Agent joined!")
        print("Sending a greeting to the backend!")
        
        container = RiffleAgent(name: "container", superdomain: app!)
        
        container!.call("hello", me!.domain) { (greeting: String) -> () in
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

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/2.PNG)

## User Login

Look at the app code carefully. Notice something a little strange? Domains are the names of applications on the fabric, but we're setting ours manually. Since domains have to be exclusive, only one copy of the app can be running at one time. In this section we'll add some very basic user registration. 

There are a few levels of authentication, each based on how secure the developer wants the app to be. For this app we will only require a user's name for registration and keep it around only as long as the user stays on the app. 

The user needs a way to input their name. Add a textfield to your view controller and create an `Outlet` for the textfield. Call this outlet `textfieldUsername`.

![Missing Image!](/img/ios-cards-tutorial/app/3-auth/1.PNG)

Now change the `go` method you created as an action for the button: 

```
@IBAction func go(sender: AnyObject) { 
    // Make the keyboard go away       
    textfieldUsername.resignFirstResponder()
    let name = textfieldUsername.text!
    
    // Create the domain for this user based on the name they've submitted
    app = RiffleAgent(domain: "xs.demo.damouse.exagainst")
    me = RiffleAgent(name: name, superdomain: app!)
    me!.delegate = self
    me!.join()
}
```

We have a bit of a problem. Every message on the fabric needs a permission, and each permissions is the agent sending the message and the endpoint the message is headed for. Lets examine our *Hello, World!* permission: 

```
Agent:       xs.demo.damouse.exagainst.userone
Endpoint:    xs.demo.damouse.exagainst.container/hello
```

Because user domains always include their name, how can you give permissions to *all* users? Enter the `Role`. Roles are a set of permissions that can be assigned to all agents. In order to give all users access to the `/hello` function you're going to edit the *User* role. The *User* role holds permissions given to every user.

Head back to the permissions page on [my.exis.io](my.exis.io). Click on *Update Role* in the *User Role* section. Add the endpoint below, substiting your own username for `damouse`. 

![Missing Image!](/img/ios-cards-tutorial/web/2-perms/3.PNG)

### Playing

Lets give the app the ability to start playing. Remember that the container is going to run all the Cards Against rounds as the game goes on. In this app we're going to call each group of players in play a `Room.` The room is going to keep track of the cards and players in play at once and handle the actual gameplay. The container is responsible for creating rooms and assigning users to them. 

`Rooms` need to know when players leave the app or their room-- they have to remove them from play. Ideally the player should let their rooms know when they leave the game, but we still have to check for silent disconnections from the user. 

<!-- TODO: move this to the general docs and link to it.  -->

Thankfully the node will provide. When an agent disconnects from the fabric, the node they were connected to publishes a special message *in its parent domain.* This message is published to the action `/sessionLeft`. In order for the container to receive this message we have to give it the appropriate permission.

Create a new static permission to match the image shown below. Again, remember to substitue your own username for `damouse` in both domains. Note the `:s` at the end of the endpoint! This gives the agent permission to *subscribe*.

![Missing Image!](/img/ios-cards-tutorial/web/2-perms/1.PNG)

In the container `Agent` object you previously made, add the following line to `onJoin`. 

```
app.subscribe("sessionLeft", sessionLeft)
```

The `sessionLeft` argument passed as the last argument to the subscribe method is a pointer to a function. You'll also need to implement the function inside the *ContainerAgent* class.

```
func sessionLeft(domain: String) {
    print("Session left: \(domain)")
}
```

As the name implies, we should see this method get called when any user leaves the app. Go ahead and try it out-- run the container and the app again. Once the app is connected and authenticated terminate the app and watch the console output for the container. 

![Missing Image!](/img/ios-cards-tutorial/app/3-auth/2.PNG)

## Passing Data

We're missing the actual cards in our card game! Time to fix that. In this section you'll load cards from static files on the container and send them across to the user. 

Riffle provides a useful wrapper model named *RiffleModel*. These classes are special-- you don't have to manually serialize them to send them to other agents. 

Unfortunatly, there's an important limitation to keep in mind when working with RiffleModels in Xcode. Sadly, the process of working with two targets, or apps, in the same Xcode project is currently unstable. When an agent receives a RiffleModel it has to have the definition of the class in the same project. This means you'll need to create the Class twice, once for the container and once for the app. 

Create a new class in both projects. Name it *Card*, make sure it inherits from RiffleModel, and give it one property: a string called *text.*

```
import Foundation
import Riffle

class Card: RiffleModel {
    var id = -1
    var text = ""
}
```

The object represents the data, but we still have to build the data. Download the data for the cards [here](/img/pg13.zip). Unzip the file and drag it into your project. Make sure to select *Copy items if needed* and make sure *Add to targets* is checked for your project. 

![Missing Image!](/img/ios-cards-tutorial/app/4-data/2.PNG)

![Missing Image!](/img/ios-cards-tutorial/app/4-data/3.PNG)

When you drag in static content like *JSON* into Xcode it doesn't always copy the content over with your project. In order to make sure your app can see the cards data you'll have to make sure it is correctly copied over 

1. Go to your project's settings by clicking the blue icon in the top left of the project navigation
2. Enter the *Build Phases* Section
3. Open the *Copy Items* section
4. Set *Destination* to *Resources*
5. Make sure the *subpath* textfield is empty
6. Uncheck *Copy only when isntalling*

Because each room is going to be a different game of *Cards Against*, each room should have their own deck of cards, represented by a *Deck* object. This model is responsible for tracking cards in play, dealing cards, and shuffling them back into the deck for reuse. 

Create a file for the new Deck class. It won't be passed along to the players in the game, so no need to have it subclass RiffleModel or make a copy for the iOS version. 

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

Delete the deck testing code and move the deck instantiation into the Session class as an instance variable. Make a new method in the OSX's *Agent* class for apps to call when they're ready to start playing. Return all the answers in the deck. 

__NOTE:__ all returns from *registered* functions have to be wrapped in an array if they're returning arrays. Note the braces around `deck.answers` below.


```
func play(domain: String) -> AnyObject {
    return [deck.answers]
}
```

Remember the first method we made in this class, our *Hello, World*. Making a function in a session object is not enough to expose it to the fabric-- there's no way for the session to know which of its methods should be exposed and when! You still have to register the function so the iOS app can call it. This task is left to you, reader: register the *play* function with the action `/play`. Be careful to call `register` on the *container* object, not *app*!

We want all players to be able to access this function! You'll need to automatically give all players permission to call the `/play` action. Go back to the *Hello, World!* example and review Roles, then add a new endpoint to the role. 

Write the code in the iOS app to call the `/play` action. Remember to substitute your own endpoint instead of the one listed in the example below.


## Back and Forth

We can pass cards back and forth, but we cant tell the container when the user picks a card. In this section you'll create a table to list all the cards and wire up the table to alert the container when a card is touched. This is the last section of part 1.

Create a new view controller in the iOS app.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/1.PNG)

Name it `GameViewController`

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/2.PNG)

Drag a new ViewController onto your storyboard.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/3.PNG)

Set the controller to subclass GameViewController.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/4.PNG)

Add a UITableView to the controller. Resize it so it takes up the whole space. Select the controller and click the *Identity Inspector* button on the top of the right pane as shown in the image below. Set the *Storyboard ID* of the controller to `game`. This allows our starting ViewController class to find the *GameViewController* at runtime easily.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/5.PNG)

Right click on the TableView and drag up to the yellow icon that represents the current view controller. Assign the viewcontroller to be the *delegate* and *datasource* of the tableview. Also create an outlet for the table called `tableCards`.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/7.PNG)

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/8.PNG)

Now that the table is looking to our new view controller for information, we have to make sure we have that information at hand! Change the GameViewController so that it looks like this:

```
import UIKit
import Riffle

class GameViewController: UIViewController {
    @IBOutlet weak var tableCards: UITableView!
    var cards: [Card] = []
    var container: RiffleAgent!
    var me: RiffleAgent!
    
    
    override func viewWillAppear(animated: Bool) {
        tableCards.registerClass(UITableViewCell.self, forCellReuseIdentifier: "card")
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("card")!
        cell.textLabel!.text = cards[indexPath.row].text
        return cell
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return cards.count
    }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        tableView.deselectRowAtIndexPath(indexPath, animated: true)
    }
}
```

These are the UITableView *delegate* and *datasource* methods. They're called when the table configures itself. By changing the values returned in these methods, we can change the behavior of the tableview. 

Inside *ViewController* change the `/play` call to match the code below. Now, instead of printing all the cards we receive from the container, we load the *GameViewController* from the storyboard, give it the cards we just loaded, and present it. 

```
    container!.call("play", me!.domain) { (cards: [Card]) in
        let controller = UIStoryboard(name: "Main", bundle: nil).instantiateViewControllerWithIdentifier("game") as! GameViewController
        
        controller.container = self.container
        controller.me = self.me!
        controller.cards = cards
        
        self.presentViewController(controller, animated: true, completion: nil)
        
        print("\(cards) Got \(cards.count) cards")
    }
```

Run the app, enter a username, and press *go*. You should see a scrollable list of cards.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/9.PNG)

The final step in part 1 is informing the container of touch events on cards. Once we start building more of the app, this is how the user will "play" cards.

At this point you've performed two registrations on the container and two calls in the app, so you've got to figure out this last one on your own! Register a method on the container that accepts two strings and prints them to the console. The name of this method is up to you. Remember to add it to the *Users* role!

From the iOS app call this new endpoint in the *GameViewController*'s `didSelectRowAtIndexPath` method. Pass your domain with `me.domain` and the text of the selected card (see `cellForRowAtIndexPath` for hints on how to get the touched card's text.)

```
func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
    tableView.deselectRowAtIndexPath(indexPath, animated: true)
}
```

Once the two are wired up restart the container and the app. When you touch a card in the app, you should see the container report the event:

```
[xs.demo.damouse.exagainst.userthree] touched the card: "The ghost of Marlon Brando"
```

## Conclusion

If it doesn't seem like you wrote much of a game so far, don't worry. The components you made in part 1 are almost all the bits needed to make the working game. In part 2 we'll set up the game logic clean up the interface.



<!-- Reference for TOC -->

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