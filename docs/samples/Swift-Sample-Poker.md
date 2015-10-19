This example is not a full-featured iOS project. It is here to demonstrate basic usage and some code examples. 

The code is written as if it implemented part of the logic of a Poker app. The client runs as part of an iOS app, the server runs in a container appliance. Both instances have access to the code in shared.swift.

Shared.swift:
```swift
import Riffle
import Foundation

// Because the model objects inherit from RiffleModel, they can be 
// sent back and forth between agents painlessly
class Player: RiffleModel {
    var name = ""
    var money = 0
    var cards: [Card] = []
}

class Card: RiffleModel {
    var suit = ""
    var value = ""
}

```

Client.swift:
```swift
import Riffle
import Foundation

class Client: RiffleSession {
    // Create a new player when the session joins that represents our state
    var player = Player()
    var players: [Player] = []


    func onJoin() {
        // set our player name based on the domain we registered with 
        player.name = self.domain

        // Register a draw call. The dealer will call us with new cards
        self.register("draw", self.draw)

        // Call the server and ask for a room
        // Note relative endpoint
        self.call("join", self.joinRoom, player)
    }


    //MARK: Handlers
    func draw(card: [Card]) {
        // Add the new cards from the dealer
        player.cards.append(card)
    } 

    func joinRoom(newPlayers: [Player]) {
        // Called with the result of the "join" call. 
        players = newPlayers
    }
}

```


Server.swift:
```swift
import Riffle
import Foundation

class Deck {
    var cards: [Card] = []

    // Creates 52 cards in a random order
    func shuffle() {...}

    // Removes and returns some randomly drawn cards
    func draw(number: Int) -> [Card] {}
}

class Server: RiffleSession {
    var players: [Player] = []
    var deck = Deck()

    func onJoin() {
        // Shuffle the deck
        deck.shuffle()

        self.register("join", self.newPlayer)
    }

    func newPlayer(player: Player) {
        // This player wants to join the room.
        players.append(player)

        // Draw two cards for the player
        // Note absolute endpoint
        self.call(player.name + "/draw", deck.draw(2)) {(result:AnyObject) in 
        print(result)
        }

        // Type safety example: this call will fail: the player expects [Card]!
        // self.call(player.name + "/draw", ["Not a string!"])
    }
}
```

