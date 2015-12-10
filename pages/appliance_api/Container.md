Container
---------

### build(name, url)

Build a container image. An image is a package of executable code along
with its dependencies that can be run as one or more instances in
containers.  The container can run code in any language in interpreted
(e.g. Python) or binary (e.g. compiled C) format that can run on Linux.

Currently, we support building an image from a public git repository.
Pass the URL to the repository (http or https).  The repository must
container a run file named "Run.yaml" that specifies how Container
should run the code.

Example Run.yaml for a Python project:
Base: exis-python
Command: python -m mybackend

buildImage supports returning progressive results.

#### Parameters:
 - name (string) -- name of the image to build
 - url (string) -- URL of git repository

**Return type:** list of strings

### create(image, name, environment={})

Create a container from an existing image.  It is possible to have
multiple containers running the same image if you want to scale up your
backend, for example.

Create will set up a secure environment for the container, reserve a
domain, and start running it automatically.  After a container has been
created, you may call container operation methods on it to start, stop,
check status, etc.

For example, suppose you have an image "gamebackendv3". Then to start
it you may call the following::

create('gamebackendv3', 'prodbackend')
prodbackend/start()

#### Parameters:
 - image (string) -- name of the image to use
 - name (string) -- name of the container to create
 - environment (dictionary) -- optional dictionary containing environment variables to pass to the container [default: {}]

**Return type:** dictionary

### list()

Return a list of containers.

**Return type:** list of dictionaries

### images()

Return a list of images.

**Return type:** list of dictionaries

### remove(name)

Remove a container. It will be stopped if it was running. After removal
the container methods will no longer be available, e.g. you cannot
start a removed container.

#### Parameters:
 - name (string) -- name of container to remove

**Return type:** dictionary

### removeImage(imageName)

Remove an image.  All containers using the image must be stopped and
removed before calling removeImage.

#### Parameters:
 - imageName (string) -- name of the image to remove


* * *

These methods operate on containers.  You must have created a container
before these methods can be used.

Endpoints are all registered under the name of the container as a prefix.
For example, the following call will return detailed information about the
container named 'gamebackend'::

gamebackend/inspect()

### image()

Return information about the image used for this container.

**Return type:** dictionary

### inspect()

Return detailed information about the container configuration.

**Return type:** dictionary

### logs()

Return log messages from the container.

**Return type:** string

### restart()

Restart the container.

### start()

Start the container.

### stop()

Stop the container.

### top()

Returns information about container resource (CPU, memory) usage.

**Return type:** dictionary

