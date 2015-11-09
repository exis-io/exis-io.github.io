# iOS Tutorial- Cards Against Humanity (Part 2)

This is the second part of the Cards Against Humanity. In this section we'll implement game logic. 

iOS applications that go to the App Store take a lot of work in all aspects of app design, especially in regard to view code. We want to explore the benefits of designing applications to run over the fabric, so all of the view code has been completed for you. You can download a checkpoint of the project with the view code here. TODO.

## Game Flow
Before we get started, a brief overview of Cards Against Humanity gameplay from wikipedia: 

__Definition:__ To start the game, each player draws ten White Cards.
The person who most recently pooped begins as the Card Czar and plays a Black Card. The Card Czar reads the question or fill-in-the-blank phrase on the Black Card out loud.
Everyone else answers the question or fills in the blank by passing one White Card, face down, to the Card Czar.
The Card Czar shuffles all of the answers and shares each card combination with the group. For full effect, the Card Czar should usually re-read the Black Card before presenting each answer. The Card Czar then picks the funniest play, and whoever submitted it gets one Awesome Point.
After the round, a new player becomes the Card Czar, and everyone draws back up to ten White Cards

Here's the game logic, distilled:

1. Play proceeds in rounds.
2. Each round, one player is choosen as the **Czar** and one random **Question** card is played.
2. Each player gets 10 **Answer** cards. 
3. Play proceeds in three phases. Each phase lasts a handful of seconds.
  1. **Answering**: every player except the czar plays an answer anonymously
  2. **Picking**: the czar chooses the best answer
  3. **Scoring**: whoever played the picked card wins and gets a point

Remember our app has two parts: iOS and OSX apps. The iOS app is what user directly interact with when they play the game, while the OSX app runs as a *container*, or a program wrapped in some magic that lets it run in the cloud. This container maintains the global state of the game, deals cards to players, and makes sure players dont cheat. By the end of part 1 the app said "Hello!" to the container and the container offered some cards for the user. 

## Getting up to Speed

Lets see whats changed since the last time you saw the project. Open the workspace-- not the project.

The iOS app and the container share the same project. This allows them to share code between them, in our case the *User* object. You can run both of them by changing the active target before running.

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/1.png)

Go ahead and run the *Backend* target. You won't be able to build the iOS app while the container is building. Run the iOS app once it completes.

To switch between active console logs, click on the *Debug Navigator* and select the desired target. Make sure you see output from both.

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/2.png)

Login with a username, hit play, and make sure you can see the cards in the table. 

### Changes

So whats changed? 

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/3.png)

The TableView in the middle of the screen picked up some styling. On the top of the screen is a Label displaying the current question, and on the bottom is a list of the current players in the game. 

Instead of touching cells to select cards, you now swipe on the card. Open the container's debug console and swipe a cell on the app. Make sure you see the picked card logged. 

![Missing Image!](/img/ios-cards-tutorial/app/6-part2/4.png)

TODO: go over the code changes. 

## Building Game Development

Since we're making a multiplayer game on our own, it would be nice to have some way of testing the app without conscripting any friends. The *Player* object representes players in the room. We're going to add some dummy players to play against while the app comes together. 

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
    
    startTimer(CHOOSE_TIME, selector: "startScoring:")
}

func startScoring(timer: NSTimer) {
    print("STATE: scoring")
    state = "Scoring"
    
    startTimer(SCORE_TIME, selector: "startAnswering")
}

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

In `addPlayer` in the container add the following immediately before the return statement.

```
startTimer(EMPTY_TIME, selector: "startAnswering")
```

The `startTimer` function will call the given method in as many given seconds. These methods are *state transition* methods-- they specify how the round proceeds. Lets define the transitions between the rounds.

`startAnswering` is the easiest. When we start a new round, pick a new question and assign a new czar.

```
let question = questions.randomElement()
setNextCzar()
```

`startPicking` is a little more tricky. Players who haven't answered should autoplay their answers.

```
var pickers = players.filter { !$0.czar }

// Autopick for players that didnt pick
for player in pickers {
    if player.pick == nil {
        player.pick = player.hand.randomElements(1, remove: true)[0]
    }
}
```

Finally, `startScoring`. Here, we choose a winner if the czar hasn't picked one, incrememnt the winner's score, and draw cards for all players.

```
var pickers = players.filter { !$0.czar }
var winner: Player?

if let domain = timer.userInfo as? String {
    winner = players.filter { $0.domain == domain }[0]
}

// if nil, no player was choosen. Autochoose one.
if winner == nil {
    print("No players picked cards! Choosing one at random")
    player = pickers.randomElements(1, remove: false)[0]
}

winner!.score += 1

// draw cards for all players
for p in pickers {
    if let c = p.pick {
        answers.append(c)
        p.hand.removeObject(c)
    }
    
    p.pick = nil
}
```


### App Receivers

The soundest backend logic in the universe is useless without the frontend code to display it. Lets implement the methods for the app to be notified of changes in the game state. In `GameViewController`:

```
func answering(player: Player, card: Card, time: Double) {
    state = "Answering"
    labelActiveCard.text = card.text
    _ = players.map { $0.chooser = $0 == player }
    tableDelegate!.setTableCards(player.domain == me.domain ? [] : currentPlayer.hand)
    viewProgress.countdown(time)
}

func picking(choices: [Card], time: Double) {
    state = "Picking"
    tableDelegate?.setTableCards(choices)
    tableCard.reloadData()
    viewProgress.countdown(time)
}

func scoring(player: Player, time: Double) {
    state = "Scoring"
    player.score += 1
    flashCell(player, model: players, collection: collectionPlayers)
    collectionPlayers.reloadData()
    viewProgress.countdown(time)
}
```

And then wire up the methods in `viewDidLoad`:

```
container.subscribe("answering", answering)
container.subscribe("choosing", choosing)
container.subscribe("scoring", scoring)
me.register("draw", draw)
```


Finally, set up the calls in the container. Set the publishes as the last line of the following methods. In `startAnswering`:

```
publish("answering", czar!, questions.randomElements(1, remove: false), PICK_TIME)
```

`startPicking`:

```
publish("picking", pickers.map({ $0.pick! }), PICK_TIME)
```

`startScoring`:

```
publish("scoring", winner!, SCORE_TIME)
```



#### Ideas

Tour through existing code. Examine the User model. 







