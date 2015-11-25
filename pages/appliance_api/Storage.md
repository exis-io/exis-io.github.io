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



#### Arguments:
 - collection (str) -- name of the collection

### create_index(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### delete_many(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### delete_one(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### distinct(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### drop(collection)



#### Arguments:
 - collection (str) -- name of the collection

### drop_index(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### drop_indexes(collection)



#### Arguments:
 - collection (str) -- name of the collection

### find(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### find_one(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### find_one_and_delete(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### find_one_and_replace(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### find_one_and_update(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### insert_many(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### insert_one(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### list_indexes(collection)



#### Arguments:
 - collection (str) -- name of the collection

### rename(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### replace_one(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### update_many(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

### update_one(collection, ...)



#### Arguments:
 - collection (str) -- name of the collection

