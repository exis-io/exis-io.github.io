Replay
------

The Replay appliance subscribes to and endpoint and logs events so that
they can be replayed on request.

### addReplay(issuer, event)

Begin logging events from an endpoint.

#### Parameters:
 - issuer
 - event (string) -- endpoint that replay will subscribe to

**Return type:** boolean

### getReplay(issuer, event, start=0, stop=inf, count=0, latest=True)

Retrieve log of events from an endpoint.

#### Parameters:
 - issuer
 - event (string) -- endpoint to retrieve messages from
 - start (numeric) -- starting timestamp of history to retrieve [default: 0]
 - stop (numeric) -- ending timestamp of history to retrieve [default: inf]
 - count (maximum number of entries to retrieve) -- integer [default: 0]
 - latest (boolean) -- retrieve the latest or earliest entries if count is specified [default: True]

**Return type:** list of dictionaries

### pauseReplay(issuer, event)

Stop logging events from an endpoint but preserve history.

#### Parameters:
 - issuer
 - event (string) -- endpoint to stop recording

**Return type:** boolean

### removeReplay(issuer, event)

Stop logging events from an endpoint and discard any stored messages.

#### Parameters:
 - issuer
 - event (string) -- endpoint to unsubscribe from

**Return type:** boolean

