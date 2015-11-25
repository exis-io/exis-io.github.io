Bouncer
-------

Bouncer is a core appliance that manages permissions and roles across the
fabric and responds to queries regarding authorization to perform an
action.

Users may make calls to Bouncer to grant and revoke permissions for
endpoints which they control.

### addDynamicRole(role, appname, perms=None)

Add a dynamic role.

and an optional verb associated with it in 'verb' which can be
called by members of the role i.e. {'target':
xs.demo.nick.app/room/$/join, 'verb': 'c'} will add the rule
with the $ replaced by the id of dynamicRole when instantiated

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - perms -- a list of dicts with fully qualified targets in 'target' with $ syntax [default: None]

### addSpecialAgent(domain, agent)

Give special agent privilege to an agent under an entire domain.  The
agent will be able to call, register, publish, and subscribe to all
endpoints at or below the given domain.

Use this feature carefully, as special agents may be able to perform
destructive operations.

#### Arguments:
 - domain -- domain under which agent can access any endpoint
 - agent -- domain of special agent

### addStaticRole(role, appname, perms=None, agents=None)

Add a static role into the database.  A role holds a list of permissions
that can then be assigned to agents.

Using roles instead of individual permissions is both intuitive and
good practice.  Example: all users can call x(); Nick and Mike are
users.  Later on, you can add a function y(), add it to the user role,
and it will automatically apply to Nick and Mike.

Returns: True if role was created

Raises: Exception describing failure

and a verb associated with it in 'verb'
which can be called by members of the role

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - perms -- a list of dicts with fully qualified targets in 'target', [default: None]
 - agents -- a list of agents to assign the role to [default: None]

### assignDynamicRole(Id, role, appname, agents)

Assign a dynamic role to an agent.

Returns: True if role was assigned to any users false otherwise

#### Arguments:
 - Id -- the id of the dynamic role instance
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - agents

### assignRole(role, appname, agents)

Assign a static role to a particular agent.

Returns: True if role was found and assigned to any of the agents false otherwise

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - agents -- a list of a string of the domains of the agents you'd like to assign the role to

### checkPerm(agent, endpoint, verb='c')

Check if the agent has permission to access the given endpoint.

#### Arguments:
 - agent -- agent performing the action
 - endpoint -- target endpoint that agent is trying to reach
 - verb [default: 'c']

### delDynamicRole(Id, role, appname)

Delete an instance of a dynamic role.

Returns: True if role instance was found and deleted false otherwise

#### Arguments:
 - Id -- the id of the role instance being deleted
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role

### destroyRole(role, appname, dynamic=False)

Delete a role and unassign any agents who were members of the role.

Returns: True if role was found and destroyed false otherwise

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - dynamic -- True if the role you want to destroy is a dynamic role defaults to static role [default: False]

### listMembers(role, appname)

List the members of a particular static role.

Returns: a list of the members for that role or false if not allowed or role doesn't exist

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role

### listRoles(appname)

List the static roles for a particular app domain.

Return a list of roles or False if not authorized.

#### Arguments:
 - appname -- the domain of the appname for the roles you want listed

### listSpecialAgents(domain)

List special agents under a domain.

#### Arguments:
 - domain -- domain to check

### newDynamicRole(role, appname, agents=None)

Create a new instance of an existing dynamic role.

Returns: the Id of the new role or False upon failure

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - agents -- an optional list of agents to assign this role to immediately [default: None]

### removeApp(appname)

Remove all permissions and roles associated with an app.

Returns: True if all data found was deleted false otherwise

#### Arguments:
 - appname -- the domain of the app to delete

### removeSpecialAgent(domain, agent)

Remove special agent privilege from an agent.

#### Arguments:
 - domain -- domain under which agent can access any endpoint
 - agent -- domain of special agent

### revokeDynamicRole(Id, role, appname, agents)

Remove a dynamic role from an agent or list of agents.

Returns: True if role was successfully removed from any of the
specified agents false otherwise.

#### Arguments:
 - Id -- the id of the dynamic role instance
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - agents -- the list of agents you are removing the role from

### revokePerm(agent, perms)

Revoke permissions from an agent.

#### Arguments:
 - agent -- agent to remove permissions from
 - perms -- list of permissions

### revokeRole(role, appname, agents)

Remove a static role from an agent or list of agents.

Returns: True if role was found and revoked for any of the agents false otherwise

#### Arguments:
 - role -- the unique identifier for the role within the domain appname
 - appname -- the domain of the appname associated with the role
 - agents -- the list of domains of the agents you'd like to remove the role from

### setPerm(agent, perms, verb='c')

Add a permission into the database.

#### Arguments:
 - agent -- the agent which can call a specific endpoint (can be NULL)
 - perms -- a list of fully qualified endpoints which can be called by the agent
 - verb [default: 'c']

