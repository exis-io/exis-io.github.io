# iOS Tutorial- Cards Against Humanity (Part 2)

This is the second part of the Cards Against Humanity. In this section we'll implement game logic. 

iOS applications that go to the App Store take a lot of work in all aspects of app design, especially in regard to view code. We want to explore the benefits of designing applications to run over the fabric, so all of the view code has been completed for you. Download a [zip](https://github.com/exis-io/CardsAgainstPart1/archive/master.zip) or clone the [repository](https://github.com/exis-io/CardsAgainstPart1).


* [Part 1](/pages/samples/SwiftCardsTutorial.md)
* [Game Flow](/pages/samples/SwiftCardsTutorial2.md#game-flow)
* [Room setup](/pages/samples/SwiftCardsTutorial2.md#room-setup)
* [State Transitions ](/pages/samples/SwiftCardsTutorial2.md#statetransitions )
* [App transitions](/pages/samples/SwiftCardsTutorial2.md#app-transitions)
* [User Role ](/pages/samples/SwiftCardsTutorial2.md#user-role )
* [Last Calls](/pages/samples/SwiftCardsTutorial2.md#last-calls)
* [Launching the Container ](/pages/samples/SwiftCardsTutorial2.md#launching-the-container )


## Game Flow
Before we get started, a brief overview of Cards Against Humanity gameplay from Wikipedia: 

__Definition:__ To start the game, each player draws ten White Cards.
The person who most recently pooped begins as the Card Czar and plays a Black Card. The Card Czar reads the question or fill-in-the-blank phrase on the Black Card out loud.
Everyone else answers the question or fills in the blank by passing one White Card, face down, to the Card Czar.
The Card Czar shuffles all of the answers and shares each card combination with the group. For full effect, the Card Czar should usually re-read the Black Card before presenting each answer. The Card Czar then picks the funniest play, and whoever submitted it gets one Awesome Point.
After the round, a new player becomes the Card Czar, and everyone draws back up to ten White Cards

Here's the game logic, distilled:

1. Play proceeds in rounds.
2. Each round, one player is chosen as the **Czar** and one random **Question** card is played.
2. Each player gets 10 **Answer** cards. 
3. Play proceeds in three phases. Each phase lasts a handful of seconds.
  1. **Answering**: every player except the czar plays an answer anonymously
  2. **Picking**: the czar chooses the best answer
  3. **Scoring**: whoever played the picked card wins and gets a point

Remember our app has two parts: iOS and OSX apps. The iOS app is what user directly interact with when they play the game, while the OSX app runs as a *container*, or a program wrapped in some magic that lets it run in the cloud. This container maintains the global state of the game, deals cards to players, and makes sure players don't cheat. By the end of part 1 the app said "Hello!" to the container and the container offered some cards for the user. 


## Permissions 

Before we catch up with the project, lets create all the permissions we'll need for the rest of this part. Go to [my.exis.io](https://my.exis.io) and either create a new app or use the app you created in part 1. (If you're creating a new application, make sure *Auth* and *Osxcontainer* are checked in the creation dialog!) Under the permissions tab make sure you have a static permission for the container on `sessionLeft`:

![Missing Image!](/img/ios-cards-tutorial/web/3-perms/1.png)

Add the following endpoints to the user role. These are all the calls the app and container will use.

![Missing Image!](/img/ios-cards-tutorial/web/3-perms/2.png)

As before, make sure you substitute the name of your application and your username to replace `cardsagainst` and `damouse`, respectively. 

## Getting up to Speed

Lets see whats changed since the last time you saw the project. Open the workspace-- not the project. The first thing you should do is change the name of your application and your username when the app agent is instantiated-- the `login` method in `LandingViewController` in the app and line 20 in `main.swift` for the backend. 

The iOS app and the container share the same project. This allows them to share code between them, in our case the *User* object. You can run both of them by changing the active target before running.

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/1.png)

Go ahead and run the *Backend* target. You won't be able to build the iOS app while the container is building. Wait for it to finish building, then build the iOS target.

To switch between active console logs, click on the *Debug Navigator* and select the desired target. Make sure you see output from both.

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/2.png)

Login with a username, hit play, and make sure you can see the cards in the table. 

### Changes

So whats changed? 

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/3.png)

The TableView in the middle of the screen picked up some styling. On the top of the screen is a Label displaying the current question, and on the bottom is a list of the current players in the game. 

Instead of touching cells to select cards, you now swipe on the card. Open the container's debug console and swipe a cell on the app. Ensure sure you see the picked card logged in the container. 

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/4.png)

Most of the changes in the project we're not going to cover between parts 1 and 2 relate to UI. `Views.swift` contains mostly boilerplate Swift code that enables the `GameViewController` to display its content. Its more common to TableView and CollectionView delegate methods implemented in a controller and the model code elsewhere, but for our purposes we want to focus on the model code. 

Our container, implemented in `Container/main.swift`, hasn't seen too many changes. 

* Hello, World is gone. Instead of loading the card inline and returning them immediately, they're now stored in instance variables
* `startTimer` and the associated instance variable `timer` seem a little mysterious. Check out the implementation here. The method calls a function after a given timer period, very useful for our time-sensitive game.

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/5.png)

`LandingViewController` seems a little more noisy, but really just picked up a handful of Outlets and UI code. 

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/6.png)

The real meaty method is `startPlaying`. This is the return from the call issued in `login`. Its called directly from the container with all the information needed to start playing: our playing hand and the other players in the room.

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/7.png)

`GameViewController` picked up quite a few instance variable. The first two blocks of variables at the top of the class are *Outlets*, *Agents*, and our UI delegates. The only fabric call is in `playerSwiped`. Callbacks come in here from the TableView when a user swipes a card. 

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/8.png)

<!-- TODO: go over the code changes.  -->

## Building Game Development

Since we're making a multiplayer game on our own, it would be nice to have some way of testing the app without conscripting any friends. The *Player* object represents players in the room. We're going to add some dummy players to play against while the app comes together. 

In the `addPlayer` method inside `main.swift`  add the following code right before the return.  

```
// Add Demo players
for i in 0...2 {
    let player = Player()
    player.domain = app.domain + ".demo\(i)"
    player.hand = answers.randomElements(10, remove: true)
    players.append(player)
}
```

Start the round. Check to make sure our new friends show up in the collection view on the bottom of the screen. Note that the demo players get their own hands, but aren't going to be backed by real world players. 

__NOTE:__ You don't have to restart the app and the container if you've only made changes to one of them. If restarting the app everything will work right away. If its the container, make sure to hit the back button on the app, then play again. 

But what are these players doing? Anyone in the game can submit a card, what are we supposed to do with the card in the container? Add the following methods to the container. 

```
func startAnswering() {
    print("STATE: Answering")
    state = "Answering"
    
    startTimer(PICK_TIME, selector: "startPicking")
}

func startPicking() {
    print("STATE: Picking")
    state = "Picking"
    
    startTimer(PICK_TIME, selector: "startScoring:")
}

func startScoring(timer: NSTimer) {
    print("STATE: scoring")
    state = "Scoring"
    
    startTimer(SCORE_TIME, selector: "startAnswering")
}
```

In `addPlayer` in the container add the following immediately before the return statement.

```
startTimer(EMPTY_TIME, selector: "startAnswering")
```

The `startTimer` function will call the given method in as many given seconds. These methods are *state transition* methods-- they specify how the round proceeds. Before you go on, run the container, connect the app to it, and watch the container's debugging log. Make sure you understand how and why the rounds transition. Play with the constants at the top of `main.swift` and see how the debugging log changes. 

Before we go further on state transitions, toss in a quick utility method. `setNextCzar` will rotate the czar around the current players in the room.

```
func setNextCzar() {
    if czar == nil {
        czar = players[0]
        czar!.czar = true
    } else {
        let i = players.indexOf(czar!)!
        let newCzar = players[(i + 1) % (players.count - 1)]
        czar!.czar = false
        newCzar.czar = true
        czar = newCzar
    }

    print("New Czar: \(czar!.domain)")
}
```

## State Transitions

Brass tacks. Lets define the how phases rotate.

`startAnswering` is the easiest. When we start a new round, pick a new question and assign a new czar. Don't deal cards here-- this is the first state. 

```
let question = questions.randomElements(1, remove: false)
setNextCzar()
```

`startPicking` is a little more tricky. In order to step around the issue of players not picking cards, we're going to autopick cards for silent players. 

```
var pickers = players.filter { !$0.czar }

// Autopick for players that didn't pick
for player in pickers {
    if player.pick == nil {
        player.pick = player.hand.randomElements(1, remove: true)[0]
    }
}
```

Finally, `startScoring`. Here, we choose a winner if the czar hasn't picked one, increment the winner's score, and draw cards for all players.

```
var pickers = players.filter { !$0.czar }
var winner: Player?

if let domain = timer.userInfo as? String {
    winner = players.filter { $0.domain == domain }[0]
} else {
    print("No players picked cards! Choosing one at random")
    winner = pickers.randomElements(1, remove: false)[0]
}

winner!.score += 1

// draw cards for all players
for p in pickers {
    if let c = p.pick {
        answers.append(c)
        p.hand.removeObject(c)
    }
    
    let newAnswer = answers.randomElements(1, remove: true)
    p.hand += newAnswer
    p.pick = nil
}
```

User picks arrive here. Enter the following code into the `pick` method on the container. Note how we handle picks based on the current state, and consider what happens if players pick multiple times, pick out of turn, or lie about their picks. Is the container stable in light of these actions?

```
let player = players.filter { $0.domain == player.domain }[0]
        
if state == "Answering" && player.pick == nil {
    player.pick = card
    player.hand.removeObject(card)
    
} else if state == "Choosing" && player.czar {
    let winner = players.filter { $0.pick == card }[0]
    startTimer(0.0, selector: "startScoring:", info: winner.domain)
    
} else {
    print("Player pick in wrong round!")
}
```

### App Receivers

The soundest backend logic in the universe is useless without the frontend code to display it. Lets implement the methods for the app to be notified of changes in the game state. In `GameViewController`:

```
func answering(newCzar: Player, question: String, time: Double) {
    print("Answering. New czar: \(newCzar.domain)")
    state = "Answering"

    labelActiveCard.text = question
    _ = players.map { $0.czar = $0 == newCzar }
    collectionDelegate.setCzar(newCzar)
    tableDelegate.refreshCards(newCzar == me ? [] : currentPlayer.hand)
    viewProgress.countdown(time)
}

func picking(answers: [String], time: Double) {
    print("Picking")
    state = "Picking"
    
    for answer in answers {
        if currentPlayer.hand.contains(answer) {
            currentPlayer.hand.removeObject(answer)
        }
    }
    
    tableDelegate.refreshCards(answers)
    viewProgress.countdown(time)
}

func scoring(player: Player, time: Double) {
    print("Scoring. Player: \(player.domain) won")
    state = "Scoring"

    for p in players {
        if p == player {
            p.score += 1
        }
    }
    
    collectionDelegate.refreshPlayers(players)
    collectionDelegate.flashCell(player)
    viewProgress.countdown(time)
}
```

Although the container and the app can exchange model objects over the fabric freely, note how we have to compare them to the local models before altering them. In scoring, for example, we have to explicitly iterate over our local `players` array to increment the score. 

## Weave it Together

Wire up the methods in `viewDidLoad`. Remember that this exposes them to the fabric. 

```
container.subscribe("answering", answering)
container.subscribe("choosing", picking)
container.subscribe("scoring", scoring)
```

Finally, set up the calls in the container. Set the publishes as the last line of the following methods. In `startAnswering`:

```
publish("answering", czar!, questions.randomElements(1, remove: false)[0], PICK_TIME)
```

`startPicking`. Why publish all the picks?

```
publish("picking", pickers.map({ $0.pick! }), PICK_TIME)
```

`startScoring`:

```
publish("scoring", winner!, SCORE_TIME)
```

Run the container and then the app. Swipe on the cells and observe the logs in both container and app. See what happens when you swipe a lot, or out of turn. 

## Beat your Friends!

This is the end of the directed tutorial. Here lie the challenges. 

First, find a friend. Change the account name in the in the iOS app's agent in either yours or their app so you connect to the same container. Make sure things work!

Now onto the tricky bits. In the first section of this part of the tutorial you added permissions to the user role. There was one endpoint that we never used, however: `draw`.

The user calls `draw` on the container to get new cards-- during a Scoring round and *only* if the user was not the czar this last turn. Without it the user will quickly run out of cards. You have to implement this call in order for the game to go smoothly. 

The last missing piece is also related to the user's hand of cards. What happens when the user does not pick a card? We're relying on the container to perform an automatic pick for the player if they haven't answered, but the *iOS application is not notified one of the cards in its hand is no longer valid*. When the container picks for a player *in abstentia* it must also alert the player, without this functionality the application is sorely incomplete.



<!-- 

Code pulls directly from CAH so we can use them directly in the tutorial 

 - Backend 

Dynamic Roles

// Create a dynamic role to give to players later
        app.call("xs.demo.Bouncer/addDynamicRole", "player", self.domain, [
            ["target": "\(domain)/$/pick", "verb":"c"],
            ["target": "\(domain)/$/leave", "verb":"c"],
            ["target": "\(domain)/$/answering", "verb":"s"],
            ["target": "\(domain)/$/picking", "verb":"s"],
            ["target": "\(domain)/$/scoring", "verb":"s"],
            ["target": "\(domain)/$/left", "verb":"s"],
            ["target": "\(domain)/$/joined", "verb":"s"]
        ], handler: nil)

Czar chooser and demo players
        // If there aren't enough players to play a full
        while players.count < 3 {
            let player = Player()
            player.domain = app.domain + ".demo\(randomStringWithLength(4))"
            player.hand = answers.randomElements(10, remove: true)
            player.demo = true
            players.append(player)
            
            if state != "Empty" {
                publish("joined", player)
            }
        }
        
        // Set the next czar round-robin, or randomly if no player is currently the czar
        if czar == nil {
            czar = players.randomElements(1)[0]
            czar!.czar = true
        } else {
            let i = players.indexOf(czar!)!
            let newCzar = players[(i + 1) % (players.count)]
            czar!.czar = false
            newCzar.czar = true
            czar = newCzar
        }
        
        print("New Czar: \(czar!.domain)")


Room Transitions
    // MARK: Round Transitions
    func startAnswering() {
        // Close the room if there are only demo players left
        if players.reduce(0, combine: { $0 + ($1.demo ? 0 : 1) }) == 0 {
            container.rooms.removeObject(self)
            players = []
            timer.cancel()
            return
        }
        
        print("    Answering -- ")
        state = "Answering"
        roomMaintenance()

        publish("answering", czar!, questions.randomElements(1, remove: false)[0], PICK_TIME)
        timer.startTimer(PICK_TIME, selector: "startPicking")
    }
    
    func startPicking() {
        print("    Picking -- ")
        state = "Picking"
        let pickers = players.filter { !$0.czar }
        
        // Autopick for players that didn't pick
        for player in pickers {
            if player.pick == nil {
                player.pick = player.hand.randomElements(1, remove: true)[0]
            }
        }
        
        publish("picking", pickers.map({ $0.pick! }), PICK_TIME)
        timer.startTimer(PICK_TIME, selector: "startScoring:")
    }
    
    func startScoring(t: NSTimer) {
        print("    Scoring -- ")
        state = "Scoring"
        
        // Choose a winner at random if the czar didn't choose one
        var pickers = players.filter { !$0.czar }
        var winner = pickers.randomElements(1, remove: false)[0]
        
        if let domain = t.userInfo as? String {
            if let p = getPlayer(players, domain: domain) {
                winner = p
            }
        }
        
        winner.score += 1
        publish("scoring", winner, winner.pick!, SCORE_TIME)
        
        // draw cards for all players, nil their picks
        for p in pickers {
            if let c = p.pick {
                answers.append(c)
                p.hand.removeObject(c)
            }
            
            let newAnswer = answers.randomElements(1, remove: true)
            p.hand += newAnswer
            p.pick = nil
            
            // If this isn't a demo player deal them a new card
            if !p.demo {
                call(p.domain + "/draw", newAnswer, handler: nil)
            }
        }
        
        timer.startTimer(SCORE_TIME, selector: "startAnswering")
    }

Room Pick

    func pick(domain: String, card: String) {
        guard let player = getPlayer(players, domain: domain) else { return }
        
        if state == "Answering" && player.pick == nil && !player.czar {
            guard let pick = player.hand.removeObject(card) else { return }
            player.pick = pick
            print("Player: \(player.domain) answered: \(card)")
            
        } else if state == "Picking" && player.czar {
            let winner = players.filter { $0.pick == card }[0]
            timer.startTimer(0.0, selector: "startScoring:", info: winner.domain)
        }
    }

Room Add Player

    func addPlayer(domain: String) -> AnyObject {
        // Add the new player and draw them a hand. Let everyone else in the room know there's a new player
        print("Adding Player \(domain)")
        
        let newPlayer = Player()
        newPlayer.domain = domain
        newPlayer.demo = false
        newPlayer.hand = answers.randomElements(4, remove: true)
        
        players.append(newPlayer)
        publish("joined", newPlayer)

        // Add dynamic role
        app.call("xs.demo.Bouncer/assignDynamicRole", self.dynamicRoleId, "player", container.domain, [domain], handler: nil)
        
        if state == "Empty" {
            timer.startTimer(EMPTY_TIME, selector: "startAnswering")
            roomMaintenance()
        }
        
        return [newPlayer.hand, players, state, self.name!]
    }


Remove Player

    func removePlayer(domain: String) {
        if let player = getPlayer(players, domain: domain) {
            print("Player marked as zombie: \(domain)")
            player.zombie = true
            player.demo = true
        } else {
            print("WARN-- asked to remove player \(domain), not found in players!")
        }
    }
    


App
Give Draw Perm
self.app.call("xs.demo.Bouncer/setPerm", self.container.domain, self.me.domain + "/draw", handler: nil)
-->





