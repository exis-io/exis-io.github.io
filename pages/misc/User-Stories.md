This document details a number of user stories, and what must be accomplished to complete them.
Format:
### Topic
List of steps

 


### User Registration
1. User loads exis.io securely through an HTTPS connection
2. Exis.io delivers client side JavaScript which connects to the Exis fabric
    - this is a TLS connection, but client is unauthenticated
3. This connection allows client to register
     - client makes a call to register(domain, password)
     - receives a success response if domain was created
    
TODO 
- figure out the TLS mechanics!!!
- unauthenticated Exis sessions must be rate limited
- exis.io needs a valid certificate

### Connection to Exis
1. AutobahnPython initializes an Application session
2. Sends a Hello message to node
3. Node sends back a Challenge Message
4. Client responds with a Response Message
5. Node validates the response, sends a Welcome Message

