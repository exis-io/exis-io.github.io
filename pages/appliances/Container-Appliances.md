A processing node running developer code. Formerly called "Mind."

## Example commands

Suppose we have a storage appliance registered as "pd.lance.storage", and that the call function implements a WAMP call in the target language.

Build an image from a git repository containing a Dockerfile:

`call("pd.user.container/build", "example-image", "https://github.com/lhartung/docker-example")`

Create a container from the image:

`call("pd.user.container/create", "example-image", "example-container")`

Start the container:

`call("pd.user.container/example-container/start")`

Get a list of all owned containers (running or stopped):

`call("pd.user.container/list")`

Inspect our running container (returns a lot of details about the container):

`call("pd.user.container/example-container/inspect")`

Stop the container and remove it:

`call("pd.user.container/example-container/stop")`

`call("pd.user.container/remove", "example-container")`



