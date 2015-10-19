## list()

List the containers belonging to the caller.

Example:
```
list():
[{u'Name': u'cards',
  u'State': u'Running'}, ...]
```

## logs(container)

Return output from the container.  stdout and stderr are provided as separate lists, each up to a maximum length of 100 messages.

Example:
```
logs('cards'):
{u'stderr': [u'error1', ..., u'error100'], 
u'stdout': [u'message1', ..., u'message100']}
```

## start(container, projectName, projectUrl, branch='master')

Start a new container by cloning code from the projectUrl.  Starting a container with the same container name as a running container will produce an error and not affect the running container.

Example:
```
start('cards', 'FabAgainstBackend', 'git@github.com:ParadropLabs/ExistAgainstBackend.git'):
{u'Branch': u'master',
 u'CommitHash': u'448a79cc4be6afdd650f7f43abcc5b5b474936c8',
 u'CommitMessage': u'added back the fromJson calls as needed to patch the call return functions not being cuminated',
 u'ProjectName': u'FabAgainstBackend',
 u'ProjectUrl': u'git@github.com:ParadropLabs/ExistAgainstBackend.git',
 u'State': u'Running',
 u'Warnings': []}
```

## status(container)

Get detailed status information about a container.

Example:
```
status('cards'):
{u'Branch': u'master',
 u'CommitHash': u'448a79cc4be6afdd650f7f43abcc5b5b474936c8',
 u'CommitMessage': u'added back the fromJson calls as needed to patch the call return functions not being cuminated',
 u'ProjectName': u'FabAgainstBackend',
 u'ProjectUrl': u'git@github.com:ParadropLabs/ExistAgainstBackend.git',
 u'State': u'Running',
 u'Warnings': []}
```

Example of a failing container:
```
status('broken'):
{u'Branch': u'master',
 u'CommitMessage': u'introduced a bug',
 ...
 u'State': u'Restarting',
 u'Warnings': [u'Process exited with return value -1', u'Process restarted 7 time(s).']}
```

## stop(container)

Stop a container.  The logs and status will no longer be available after a container is stopped.
