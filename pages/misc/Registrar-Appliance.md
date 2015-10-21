Registrar Appliance
Runs a HTTPS Server (currently written in Python Twisted)  
Available at: registrar.xs.exis.io  
Each registrar has a "serving domain".  
For example, the top level registrar serves the "xs" domain, so any registration requests will be transparently changed into "xs.user".


# API
### POST /register

Arguments: 
* domain (should be domain specific, registrar will convert 'user' > 'xs.user')
* domain-password
* domain-email
* Name

Return Value:
success - 200
failure - 404

Function:
* Translates the domain into the full domain ('user' > 'xs.user' if registrar is serving 'xs' domain)
* Calls the auth appliance serving the same domain ('xs.auth' with a register_domain)
* Auth appliance returns a token to validate email, which registrar uses to send an email
* Returns  200 or 404 depending on result

### GET /verify 

Arguments: 
* domain (should be full domain 'xs.user')
* token

Return Value:
200 or 404

Function:
* Calls the auth appliance serving the same domain ('xs.auth' with a verify_domain call)
* Auth appliance verifies that emailtoken matches the one sent out, sets that account to verified
* Registrar receives a success or failure
* Returns  202 or 404

### POST /login
Arguments: 
* domain (should be relative domain 'user', will be translated to 'xs.user')
* password

Return Value:
{'token': logintoken} or 404

Function:
* Calls the auth appliance serving the same domain ('xs.auth' with a get_token call)
* Auth appliance returns a logintoken (or failure)
* Registrar returns the token to user in response, or a 401 if not found, or 404 if unsuccessful

