Storage
-------

This module exports operations on collections.  All of the methods wrap pymongo
functions and take the collection name as the first argument.  See
http://api.mongodb.org/python/current/api/pymongo/collection.html for details
on the arguments that these functions accept.

Endpoints are all registered under the collection prefix.  This part is a fixed
string, not the collection name.  For example, the following call will insert
a document into the fruits collection::

collection/insert_one('fruits', {'name': 'apple', 'color': 'red'}).

### count(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** integer

### create_index(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### delete_many(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### delete_one(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### distinct(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** integer

### drop(collection)



#### Parameters:
 - collection (string) -- name of the collection

### drop_index(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

### drop_indexes(collection)



#### Parameters:
 - collection (string) -- name of the collection

### find(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** list of dictionaries

### find_one(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### find_one_and_delete(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### find_one_and_replace(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### find_one_and_update(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### insert_many(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### insert_one(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### list_indexes(collection)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** list of dictionaries

### rename(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

### replace_one(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### update_many(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

### update_one(collection, ...)



#### Parameters:
 - collection (string) -- name of the collection

**Return type:** dictionary

