Persists data. 

Wrapper [1]

Simple wrapper around an instance of some database
RPC call arguments are simply fed into the underlying database

postgres
MySQL
mongodb

Bank [2]
Object-level storage
REST
Replay
Stores data automatically by subscribing to assigned endpoints
Allows agents to query past data

? [3]
Details
Complex, distributed stores
May require agent code libraries

DHT
Persists objects redundantly across agents

SyncActiveRecord
ActiveRecord like interface to objects
Objects referencible across instances
Changes to objects are distributed

## Storage Appliance

The storage appliance implements a wrapper around mongodb.  When instantiated the storage appliance registers a fixed set of collection operations that are thin wrappers around [pymongo collection operations](http://api.mongodb.org/python/current/api/pymongo/collection.html).  Arguments and return values are almost identical, except the storage appliance actions all take the name of the collection as the first argument.

### Example

Suppose we have a storage appliance registered as "pd.lance.storage", and that `call` implements a WAMP call in the target language.

The following will add a new document to the fruits collection.  It does not matter whether the collection existed prior to this call, as mongodb will create it if necessary.

`call("pd.lance.storage/insert_one", "fruits", {"name": "apple", "color": "red"})`

The following will return the previously-created document to us as a dictionary or equivalent object.

`call("pd.lance.storage/find_one", "fruits", {"name": "apple"})`