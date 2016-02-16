Auth
----

The Auth appliance handles domain registrations and login credentials.  It
allows other users to log in and use your app and manages the secure
storage and transfer of their credentials.

Most of the work that Auth does is hidden behind the scenes, but you can
make requests to Auth to generate custom login tokens that allow you to
connect your code to the fabric while developing on your local machine.

### delete_custom_token(tokenname, fulldomain)

Delete a custom token by name.

#### Parameters:
 - tokenname (string) -- name given to the token
 - fulldomain (string) -- login domain for the token

**Return type:** boolean

### gen_custom_token(tokenname, fulldomain)

Generate a custom token which can be used to log in as the given
domain.  The new token can be retrieved with get_custom_token.

#### Parameters:
 - tokenname (string) -- name of the token for later reference
 - fulldomain (string) -- domain to grant with the token

**Return type:** boolean

### get_custom_token(tokenname, fulldomain)

Return the token for a domain/name pair.  This is a private key, so its
contents should be kept secure.

#### Parameters:
 - tokenname (string) -- name given to the token
 - fulldomain (string) -- login domain for the token

**Return type:** string

### get_public_data(query)

Get public data associated with user(s) in storage.

If query is missing, None, or an empty dictionary, then all users'
public data will be retrieved.

#### Parameters:
 - query (dictionary) -- filter for entries to return using MongoDB syntax

**Return type:** list

### get_user_data()

Get public and private data stored for the logged in user.

Returns a dictionary containing at least two entries ("public" and
"private") which are dictionaries.

**Return type:** dictionary

### github_login(access_token, scope)

Return either a session token or a json which specifies that a domain name is still needed if
registration is not yet complete.

#### Parameters:
 - access_token (string) -- the github access_token
 - scope (string) -- the scope for which the token is valid

**Return type:** dict

### github_verify(access_token, domain)

Tries to validate domain/associate with a github_token.
Return either a login token or raise an error if name is taken or
account already verified or doesn't exist.

#### Parameters:
 - access_token
 - domain (string) -- the domain to be associated with the account

**Return type:** dict

### list_custom_tokens(appdomain)

Return a list of the existing custom tokens under the app domain.  The
the list only contains the names.  You can retrieve a token by name
with get_custom_token.

#### Parameters:
 - appdomain (string) -- app domain under which the tokens were made

**Return type:** dictionary

### save_user_data(public_data, private_data)

Save data associated with the logged in user in storage.

#### Parameters:
 - public_data (dictionary) -- public data visible to all app users
 - private_data (dictionary) -- private data visible only to the user

