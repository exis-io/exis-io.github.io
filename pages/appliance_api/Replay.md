Replay
------

The Replay appliance subscribes to and endpoint and logs events so that
they can be replayed on request.

### addReplay(issuer, event)

Begin logging events from an endpoint.

#### Arguments:
 - issuer
 - event -- endpoint that replay will subscribe to

### getReplay(issuer, event, start=0, stop=inf, count=0, latest=True)

Retrieve log of events from an endpoint.

#### Arguments:
 - issuer
 - event -- endpoint to retrieve messages from
 - start [default: 0]
 - stop [default: inf]
 - count [default: 0]
 - latest [default: True]

### pauseReplay(issuer, event)

Stop logging events from an endpoint but preserve history.

#### Arguments:
 - issuer
 - event -- endpoint to stop recording

### removeReplay(issuer, event)

Stop logging events from an endpoint and discard any stored messages.

#### Arguments:
 - issuer
 - event -- endpoint to unsubscribe from

