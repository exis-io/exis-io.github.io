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
 -- tokenname (string) â name given to the token
 -- fulldomain (string) â login domain for the token

**Return type:** boolean

### gen_custom_token(tokenname, fulldomain)

Generate a custom token which can be used to log in as the given
domain.  The new token can be retrieved with get_custom_token.

#### Parameters:
 -- tokenname (string) â name of the token for later reference
 -- fulldomain (string) â domain to grant with the token

**Return type:** boolean

### get_custom_token(tokenname, fulldomain)

Return the token for a domain/name pair.  This is a private key, so its
contents should be kept secure.

#### Parameters:
 -- tokenname (string) â name given to the token
 -- fulldomain (string) â login domain for the token

**Return type:** string

### list_custom_tokens(appdomain)

Return a list of the existing custom tokens under the app domain.  The
the list only contains the names.  You can retrieve a token by name
with get_custom_token.

#### Parameters:
 -- appdomain (string) â app domain under which the tokens were made

**Return type:** dictionary

