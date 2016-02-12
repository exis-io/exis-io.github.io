Bouncer
-------

Bouncer is a core appliance that manages permissions and roles across the
fabric and responds to queries regarding authorization to perform an
action.

Users may make calls to Bouncer to grant and revoke permissions for
endpoints which they control.

### addDevModeDomain(domain)

Enable development mode for a domain so that permissions are ignored
for messages within the domain.

For example, if dev mode is enabled for xs.user.app, then xs.user.alice
can call, publish, subscribe, or register xs.user.bob/ping without
having been explicitly granted permission to that endpoint.

#### Parameters:
 - domain (string) -- domain under which all domains can call each other without needing explicit permissions

**Return type:** boolean

### addDynamicRole(role, appname, perms=None)

Add a dynamic role.

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - perms (list of dictionaries) -- a list of dicts with fully qualified targets in 'target' with $ syntax and an optional verb associated with it in 'verb' which can be called by members of the role i.e. {'target': xs.demo.nick.app/room/$/join, 'verb': 'c'} will add the rule with the $ replaced by the id of dynamicRole when instantiated [default: None]

**Return type:** boolean

### addSpecialAgent(domain, agent)

Give special agent privilege to an agent under an entire domain.  The
agent will be able to call, register, publish, and subscribe to all
endpoints at or below the given domain.

Use this feature carefully, as special agents may be able to perform
destructive operations.

#### Parameters:
 - domain (string) -- domain under which agent can access any endpoint
 - agent (string) -- domain of special agent

**Return type:** boolean

### addStaticRole(role, appname, perms=None, agents=None)

Add a static role into the database.  A role holds a list of permissions
that can then be assigned to agents.

Using roles instead of individual permissions is both intuitive and
good practice.  Example: all users can call x(); Nick and Mike are
users.  Later on, you can add a function y(), add it to the user role,
and it will automatically apply to Nick and Mike.

Returns: True if role was created

Raises: Exception describing failure

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - perms (list of dictionaries) -- a list of dicts with fully qualified targets in 'target', and a verb associated with it in 'verb' which can be called by members of the role [default: None]
 - agents (list of strings) -- a list of agents to assign the role to [default: None]

**Return type:** boolean

### assignDynamicRole(Id, role, appname, agents)

Assign a dynamic role to an agent.

Returns: True if role was assigned to any users false otherwise

#### Parameters:
 - Id (string) -- the id of the dynamic role instance
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - agents (list of strings) -- the list of agents you are assigning the role to or a string

**Return type:** boolean

### assignRole(role, appname, agents)

Assign a static role to a particular agent.

Returns: True if role was found and assigned to any of the agents false otherwise

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - agents (list of strings) -- a list of a string of the domains of the agents you'd like to assign the role to

**Return type:** boolean

### checkPerm(agent, endpoint, verb='c')

Check if the agent has permission to access the given endpoint.

#### Parameters:
 - agent (string) -- agent performing the action
 - endpoint (string) -- target endpoint that agent is trying to reach
 - verb (string) -- verb associated with action on the endpoint [default: 'c']

**Return type:** boolean

### delDynamicRole(Id, role, appname)

Delete an instance of a dynamic role.

Returns: True if role instance was found and deleted raises an exception otherwise

#### Parameters:
 - Id (string) -- the id of the role instance being deleted
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role

**Return type:** boolean

### destroyRole(role, appname, dynamic=False)

Delete a role and unassign any agents who were members of the role.

Returns: True if role was found and destroyed false otherwise

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - dynamic (boolean) -- True if the role you want to destroy is a dynamic role defaults to static role [default: False]

**Return type:** boolean

### inDevModeStatus(domain)

Check if a specific domain is currently in dev mode.

#### Parameters:
 - domain (string) -- domain which we are checking if is in dev mode

**Return type:** boolean

### listMembers(role, appname)

List the members of a particular static role.

Returns: a list of the members for that role or false if not allowed or role doesn't exist

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role

**Return type:** list of strings

### listRoles(appname)

List the static roles for a particular app domain.

Returns a dictionary containing lists of static and dynamic roles.

#### Parameters:
 - appname (string) -- the domain of the appname for the roles you want listed

**Return type:** dictionary

### listSpecialAgents(domain)

List special agents under a domain.

#### Parameters:
 - domain (string) -- domain to check

**Return type:** list of strings

### newDynamicRole(role, appname, agents=None)

Create a new instance of an existing dynamic role.

Returns: the Id of the new role or raises an exception upon failure

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - agents (list of strings) -- an optional list of agents to assign this role to immediately [default: None]

**Return type:** string

### removeApp(appname)

Remove all permissions and roles associated with an app.

Returns: True if all data found was deleted false otherwise

#### Parameters:
 - appname (string) -- the domain of the app to delete

**Return type:** boolean

### removeDevModeDomain(domain)

Remove a domain from dev mode so we have to require permissions.

#### Parameters:
 - domain (string) -- domain under which all domains could call each other without needing explicit permissions

**Return type:** boolean

### removeSpecialAgent(domain, agent)

Remove special agent privilege from an agent.

#### Parameters:
 - domain (string) -- domain under which agent can access any endpoint
 - agent (string) -- domain of special agent

**Return type:** boolean

### revokeDynamicRole(Id, role, appname, agents)

Remove a dynamic role from an agent or list of agents.

Returns: True if role was successfully removed from any of the
specified agents raises an exception otherwise.

#### Parameters:
 - Id (string) -- the id of the dynamic role instance
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - agents (list of strings) -- the list of agents you are removing the role from

**Return type:** boolean

### revokePerm(agent, perms)

Revoke permissions from an agent.

#### Parameters:
 - agent (string) -- agent to remove permissions from
 - perms (list of strings) -- list of permissions

**Return type:** boolean

### revokeRole(role, appname, agents)

Remove a static role from an agent or list of agents.

Returns: True if role was found and revoked for any of the agents false otherwise

#### Parameters:
 - role (string) -- the unique identifier for the role within the domain appname
 - appname (string) -- the domain of the appname associated with the role
 - agents (list of strings) -- the list of domains of the agents you'd like to remove the role from

**Return type:** boolean

### setPerm(agent, perms, verb='c')

Add a permission into the database.

#### Parameters:
 - agent (string) -- the agent which can call a specific endpoint (can be NULL)
 - perms (list of strings) -- a list of fully qualified endpoints which can be called by the agent
 - verb (string) -- verb associated with endpoint(s) [default: 'c']

**Return type:** boolean

