No replay, level 1 authentication. Auth appliance has been configured to register users that present credentials where there is no existing user. 

```python
import sys

from twisted.internet.defer import inlineCallbacks
import exis

class Connection(exis.Connection):

    @inlineCallbacks
    def onJoin(self):
        yield self.register(self.sendChat, 'send')
        yield self.register(self.privateMessage, 'pm')
        yield self.subscribe(self.newChatMessage, 'receive')

    def newChatMessage(self, user, message):
        print user + ': ' + message

    @inlineCallbacks
    def sendChat(self, message):
        yield self.publish('receive', message)

    def privateMessage(self, user):
        print 'New private chat request from : ' + user

if __name__ == '__main__':
    fabric = Connection.start("ws://paradrop.io:9080/ws", 
        username='damouse',
        password='12345678')

    print 'Connected to fabric chat!'

    while true:
        message = raw_input('> ')

        if message == 'exit':
            sys.exit(0)

        fabric.sendChat(message)
```