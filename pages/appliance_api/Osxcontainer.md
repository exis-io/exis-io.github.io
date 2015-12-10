Osxcontainer
------------

### build(imageName, projectName, projectUrl, branch='master', scheme=None)

Build a container image.  An image is a package of executable code
along with its dependencies that can be run as one or more instances in
containers.

Currently, we support building an XCode project from a public git
repository.  Pass the URL to the repository (http or https) along with
some details about the project.

There can be multiple workspaces, projects, and/or schemes in a
repository.  For example, you can have frontend, backend, and shared
code together in your repository.  Use the projectName and scheme
arguments to tell Osxcontainer what code to run.

If you specify a scheme, you must also configure that scheme as shared in
XCode.  Check the Shared box in Product->Scheme->Manage Schemes.

#### Parameters:
 -- imageName (string) â name of resulting container image
 -- projectName (string) â name of the project in XCode
 -- projectUrl (string) â URL for git repository, must start with http or https
 -- branch (string) â branch to checkout from repository, defaults to master [default: 'master']
 -- scheme (string) â scheme to build, defaults to projectName [default: None]

**Return type:** dictionary

### create(imageName, containerName)

Create a container from an image.  It is possible to have multiple
containers running the same image if you want to scale up your backend,
for example.

Create does not start running the container automatically; it only sets
up a secure environment and reserves a domain for the container.  After
a container has been created, you may call container operation methods
on it to start and stop it.

For example, suppose you have an image "gamebackendv3".  Then to start
it you may call the following::

create('gamebackendv3', 'prodbackend')
prodbackend/start()

#### Parameters:
 -- imageName (string) â name of image to use
 -- containerName (string) â name of new container

**Return type:** dictionary

### images()

List images.

Returns a list of dicts with the Name field set as well as some fields
pertaining to the repository and code version that was used for the
image.

**Return type:** list of dictionaries

### list()

List containers.

Returns a list of dicts with fields Name, Image, and State set.

**Return type:** list of dictionaries

### remove(containerName)

Remove a container.  It will be stopped if it was running.  After
removal the container methods will no longer be available, e.g. you
cannot start a removed container.

#### Parameters:
 -- containerName (string) â name of the container to remove

### removeImage(imageName)

Remove an image.  All containers based on the image must be removed
before removeImage is called.

#### Parameters:
 -- imageName (string) â name of image to remove


* * *

These methods operate on OSX containers.  You must have created a container
before these operations can be use.

Endpoints are all registered under the name of the container as a prefix.
For example, the following call will return detailed information about the
container named 'gamebackend'::

gamebackend/inspect()

### inspect()

Return detailed information about the status and configuration of the
container.

**Return type:** dictionary

### logs()

Return log messages (stdout and stderr) from the container in a
dictionary with keys 'stdout' and 'stderr'.

**Return type:** dictionary

### start()

Start the container.

### stop()

Stop the container.

