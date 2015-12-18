# iOS Tutorial- Cards Against Humanity (Part 1)

Cards Against Humanity is a party game in which players complete fill-in-the-blank statements using mature-content phrases printed on playing cards. In this tutorial you'll be building an iOS version of Cards Against Humanity that runs over the fabric with a backend written entirely in Swift. Part 2 can be found [here](/pages/samples/SwiftCardsTutorial2.md).

Cards Against is played between a set of peers, so it seems like the game should be able to run peer to peer, or each player communicating directly with other players. Like all cards games, however, we have to watch out for cheaters! In order to maintain the state of the game and make sure play is fair we'll rely on a *container*, or a program running in the cloud. This container will fulfill the role traditionally filled by web servers. 

Head to [github](https://github.com/exis-io/Exis/tree/master/ios) to set up an iOS project for development with a fabric. For this tutorial you will need the *iOS and Backend* project.


*Table of Contents*

* [Website Setup](/pages/samples/SwiftCardsTutorial.md#website-setup)
* [Hello, Riffle!](/pages/samples/SwiftCardsTutorial.md#hello-riffle)
* [Auth](/pages/samples/SwiftCardsTutorial.md#auth)
* [Meta Calls](/pages/samples/SwiftCardsTutorial.md#meta-calls)
* [Passing Data](/pages/samples/SwiftCardsTutorial.md#passing-data)
* [Picking Cards](/pages/samples/SwiftCardsTutorial.md#picking-cards)
* [Part 2](/pages/samples/SwiftCardsTutorial2.md)

## Website Setup 

Applications built with Exis are managed through the web interface at [my.exis.io](https://my.exis.io). 

**1.** Check out the instructions on [how to make a new app on exis.io](/pages/samples/Samples.md#creating-a-new-app). Before you start writing any code you'll need to get set up on the website.

**2.** Create a new account and remember your username. 

**3.** Create an app called `cardsagainst`. 

**4.** Attach an *Auth Appliance*

<!-- All messages over the fabric have to have [*Permissions*][perm]. This allows agents to send messages. For our *Hello, World!* we'll add a static permission that allows your app to call `hello` on the container. 

From the dashboard click on the blue *Permissions* button. On the permissions page click on the *User* accordion at the top of the page. Enter `.gamelogic/hello` into the field and click add.

![Missing Image!](/img/ios-cards-tutorial/web/1-setup/6.PNG)

The `User Role` is a set of permissions that's given to all domains representing users of your application. -->


## Hello Riffle

<!-- LINK: RegCall, Domain Names -->

Lets run a quick `Hello, World!`. Here you'll register a function in the OSX app and call it from the iOS app. 

Remember that the OSX project will eventually run persistently in the cloud. For now, you can test with the app running locally. Because the OSX app will run in a container, we'll refer to it as the *container* from here on out. 

### Register a function and call it

**1.** Add the following code to `main.swift` in the container.

```swift
import Foundation
import Riffle

let app = RiffleDomain(domain: "xs.demo.USERNAME.cardsagainst")

class Container: RiffleDomain {
    override func onJoin() {
        print("Domain joined")
        
        register("play", play)
    }
    
    func play(player: String) -> AnyObject {
        print("\(player) says hello!")
        return "Hi, \(player)!"
    }
}

let container = Container(name: "gamelogic", superdomain: app)
container.join()
NSRunLoop.currentRunLoop().run()

```

**2.** Enter your username in place of *USERNAME* on the 4th line above. 

**3.** Create a button and an IBAction on the iOS app. Name the action `login` 

**4.** Replace the code in `ViewController.swift` with the following. Again, substitute your own username in place of *USERNAME*.

```swift
import UIKit
import Riffle

class ViewController: UIViewController, RiffleDelegate {
    var app: RiffleDomain!
    var me: RiffleDomain!
    var backend: RiffleDomain!
    
    
    @IBAction func login(sender: AnyObject) {        
        app = RiffleDomain(domain: "xs.demo.USERNAME.cardsagainst")
        me = RiffleDomain(name: "userone", superdomain: app!)
        me.delegate = self
        me.join()
    }
    
    func onJoin() {
        print("Domain joined!")
        print("Sending a greeting to the backend")
        
        backend = RiffleDomain(name: "gamelogic", superdomain: app)
        
        backend.call("play", me.domain) { (greeting: String) -> () in
            print("The backend replied with \(greeting)")
        }
    }
    
    func onLeave() {
        print("Domain left!")
    }
}
```

Don't run the app just yet! The app won't be allowed to call the function you just made. Everything that talks over the fabric needs to have [permission][perm] to do so.

### Edit the user role 

**1.** Click the blue *Permissions Management* button on the dashboard at [my.exis.io](https://my.exis.io).

**2.** Expand the user role. Enter `.gamelogic/play` as the endpoint for your role.

![Missing Image!](/img/ios-cards-tutorial/web/2-perms/2.PNG)

**3.** Click the add button.

<!-- In the iOS app add a button to the empty view controller created when you made the project. Create an action for the button to its parent view controller. In the example below the action is called *go*, but you can name it whatever you'd like. Don't worry if you have more code in your view controller than is shown in this image.  -->


Run the backend, then the app. When you run two targets, or programs, in one Xcode project, Xcode will always display output from the last target run. To switch between outputs change the active target in the debug console.

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/6.PNG)

Watch the output of the backend-- once you see that its session has connected with `Domain Joined!` touch the button you added to your app. If you see the name of the app passed to the container and back, celebrate-- you've successfully written your first Exis enabled application!

Here's some sample output from an app on the left and a container on the right. 

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/2.PNG)

<!-- TODO: mention the extra log output on the container -->

## Auth 

Anyone should be able to play our Cards Against Humanity app, but we're going to have to keep track of the players in the game. This falls under the purview of [*Authentication*][auth].

Look at the app code carefully. Notice something a little strange? Domains are the names of applications on the fabric, but we're setting ours manually. Since domains have to be exclusive, only one copy of the app can be running at one time.

There are a few levels of authentication, each based on how secure the developer wants the app to be. For this app we will only require a user's name for registration and keep it around only as long as the user stays on the app. 

### Get a username

**1.** Add a `UITextField` to `ViewController` using the storyboard. 

**2.** Connect an outlet from the text field to the controller. Call it `textfieldUsername`.

![Missing Image!](/img/ios-cards-tutorial/app/3-auth/1.PNG)

**4.** Change the `login` action connected to the button. 

```
@IBAction func login(sender: AnyObject) {
    // Make the keyboard go away
    textfieldUsername.resignFirstResponder()
    let name = textfieldUsername.text!
    
    // Create the domain for this user based on the name they've submitted
    app = RiffleDomain(domain: "xs.demo.USERNAME.cardsagainst")
    me = RiffleDomain(name: name, superdomain: app!)
    me.delegate = self
    me.join()
}
```

Users will now be created dynamically as they enter their names into the app. As configured, the app will allow anyone to play as long as the name they choose is not currently in use. This is the least strict form of authentication-- email and password is a lot more secure and commonly used. 

<!-- 
Head back to the permissions page on [my.exis.io](my.exis.io). Click on *Update Role* in the *User Role* section. Add the endpoint below, substituting your own username for `damouse`. 

![Missing Image!](/img/ios-cards-tutorial/web/2-perms/3.PNG) -->

## Meta Calls

The container has to know when players join or leave the game to add or remove them from play, respectively.

Ideally the player should let the container know when they leave the game, but if that user suspends the app or their device crashes, the container will never remove them from play.

Thankfully the node will provide. When an agent disconnects from the fabric, the node they were connected to publishes a special message *in its parent domain.* This message is published to the action `/sessionLeft`. In order for the container to receive this message we have to give it the appropriate permission.

### Give container sessionLeft permissions

<!-- TODO: task- document this on the permissions page and link here -->

**1.** Create a new role named `container` .

**2.** Set the sessionLeft endpoint as a static permission.

**3.** Add the container as a member of the role.


<!-- to match the image shown below. Again, remember to substitute your own username for `damouse` in both domains. 
 -->

![Missing Image!](/img/ios-cards-tutorial/web/2-perms/1.PNG)

The container will now be allowed to subscribe to `sessionLeft`.

### Subscribe to sessionLeft

**1.** Add a new function handler in `main.swift` called `playerLeft`.

```
func sessionLeft(domain: String) {
    print("Domain left: \(domain)")
}
```

**2.** Subscribe to the endpoint in `onJoin` in `main.swift`. 

```
app.subscribe("sessionLeft", sessionLeft)
```

As the name implies, we should see this method get called when any user leaves the app. Go ahead and try it out-- run the container and the app again. Once the app is connected and authenticated terminate the app and watch the console output for the container. 

## Passing Data

We're missing the actual cards in our card game! Time to fix that. In this section you'll load cards from static files on the container and send them across to the user. 

### Import cards data into Xcode

**1.** Download the data for the cards [here](/img/pg13.zip)

**2.** Unzip the file and drag it into your project. Make sure to select *Copy items if needed* and make sure *Add to targets* is checked for your project. 

![Missing Image!](/img/ios-cards-tutorial/app/4-data/2.PNG)

![Missing Image!](/img/ios-cards-tutorial/app/4-data/3.PNG)

When you drag in static content like *JSON* into Xcode it doesn't always copy the content over with your project. In order to make sure your app can see the cards data you'll have to make sure it is correctly copied over 

**3.** Go to your project's settings by clicking the blue icon in the top left of the project navigation

**4.** Enter the *Build Phases* Section

**5.** Open the *Copy Items* section

**6.** Set *Destination* to *Resources*

**7.** Make sure the *subpath* textfield is empty

**8.** Uncheck *Copy only when installing*


### Load cards into backend

Load the cards from the data files and send them across to the user.

**1.** Create a new swift file `Models.swift`. Make sure its a member of both targets.

**2.** Add a function that loads the cards from their files

```swift
// Load the json file with the given name and return the strings
func loadCards(name: String) -> [String] {
    let jsonPath = NSBundle.mainBundle().pathForResource(name, ofType: "json")
    let x = try! NSJSONSerialization.JSONObjectWithData(NSData(contentsOfFile: jsonPath!)!, options: NSJSONReadingOptions.AllowFragments) as! [[String: AnyObject]]
    
    return x.map { (element: [String: AnyObject]) -> String in
        return element["text"] as! String
    }
}
```

**3.** Load both sets of cards at the top of `main.swift`, before any of the other code

```
var baseQuestions = loadCards("q13")
var baseAnswers = loadCards("a13")
print(baseQuestions)
```

If you see a listing of Cards as strings then the deck loaded successfully-- if not then there may be something wrong with your project's configuration. Make sure the data files have been added to both targets. 

### Return the cards

Instead of printint the cards out to the console, lets return them to the player that called `play`.

**1.** Remove the print statement in the last line above.

**2.** Change the play function in `main.swift` to return the list of all answers

```swift
func play(player: String) -> AnyObject {
    print("\(player) says hello!")
    return [baseQuestions]
}
```

<!-- TODO: talk about cumin? -->

**3.** Change the call to `gamelogic/play` so it prints the list of cards

```swift
backend.call("play", me.domain) { (cards: [String]) -> () in
    print("\(cards) Got \(cards.count) cards")
}
```

<!-- __NOTE:__ all returns from *registered* functions have to be wrapped in an array if they're returning arrays. Note the braces around `deck.answers` below. -->

<!-- ```
func play(domain: String) -> AnyObject {
    return [deck.answers]
}
``` -->

Run the app. Make sure you can see the cards logged out to the console.

## Picking Cards

The single fundamental action a player performs in Cards Against Humanity is *picking* a card. In this section you'll create a table to list all the cards and wire up the table to alert the container when a card is touched. 

### Create GameViewController

**1.** Create a new view controller in the iOS app.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/1.PNG)

**2.** Name it `GameViewController`

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/2.PNG)

**3.** Drag a new ViewController onto your storyboard.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/3.PNG)

**4.** Set the controller to subclass GameViewController.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/4.PNG)

**5.** Change the `StoryboardId` of the new controller to `game`. Select the controller and click the *Identity Inspector* button on the top of the right pane as shown in the image below. Set the *Storyboard ID* of the controller to `game`. This allows our starting ViewController class to find the *GameViewController* at runtime easily.

### Add a table

**1.** Add a UITableView to the controller and resize it so it takes up the whole space.

**2.** Connect the tableview to `GameViewController`. Name the outlet  `tableCards`.

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/5.PNG)

**3.** Set the controller as the `delegate` and `datasource` for the tableview. 

<!-- Right click on the TableView and drag up to the yellow icon that represents the current view controller. Assign the cont to be the *delegate* and *datasource* of the tableview. Also create an outlet for the table called `tableCards`. -->

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/7.PNG)

![Missing Image!](/img/ios-cards-tutorial/app/5-ui/8.PNG)

### Display the cards

Now that the table is looking to our new view controller for information, we have to make sure we have that information at hand! 

**1.** Add the following instance variables to `GameViewController`.

```swift

import UIKit
import Riffle

class GameViewController: UIViewController {
    @IBOutlet weak var tableCards: UITableView!

    var cards: [String] = []
    
    var app: RiffleDomain!
    var room: RiffleDomain!
    var me: RiffleDomain!
    
}

```

**2.** Implement `delegate` and `datasource` callbacks.

```swift

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

```

**3.** Register the `UITableViewCell` identifier in `viewWillAppear` inside `GameViewController`.

```swift

override func viewWillAppear(animated: Bool) {
    tableCards.registerClass(UITableViewCell.self, forCellReuseIdentifier: "card")
}


```

### Call the room with player picks

Inside *ViewController* change the `/play` call to match the code below. Now, instead of printing all the cards we receive from the container, we load the *GameViewController* from the storyboard, give it the cards we just loaded, and present it. 

```
    backend.call("play", me.domain) { (cards: [Card]) in
        let controller = UIStoryboard(name: "Main", bundle: nil).instantiateViewControllerWithIdentifier("game") as! GameViewController
        
        controller.backend = self.backend
        controller.me = self.me
        controller.cards = cards
        
        self.presentViewController(controller, animated: true, completion: nil)
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
[xs.demo.damouse.cardsagainst.userthree] touched the card: "The ghost of Marlon Brando"
```

<!-- TODO: explain and replace the #details calls -->

## Part 2

If it doesn't seem like you wrote much of a game so far, don't worry. The components you made in part 1 are almost all the bits needed to make the working game. In [part 2](/pages/samples/SwiftCardsTutorial2.md) we'll set up the game logic clean up the interface.



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