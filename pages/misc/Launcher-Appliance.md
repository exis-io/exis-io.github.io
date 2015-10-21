# API

### list

Get list of appliances that can be launched.

Example:
```
{
    ...
    u'relay': {u'description': u'Relay messages from a call to many subscribers.', ...},
    u'replay': {u'description': u'Replay published messages from a time interval.', ...},
    u'storage': {u'description': u'Store and retrieve data in JSON format.', ...},
    ...
}
```

### start

Start a new appliance.

Args:
* domain: parent domain of the appliance, e.g. xs.user.app
* applianceType: string indicating appliance type, e.g. "storage"
* alias: optional name for the appliance (default name is applianceType)
* config: optional string or JSON-serializable configuration to pass to the new appliance. The resulting configuration will appear to the appliance through the APPLIANCE_CONF environment variable.

Examples:
* `start("xs.user.app", "storage")` results in a new appliance "xs.user.app.storage"
* `start("xs.user.app", "coolstorage", alias="storage")` also results in a new appliance "xs.user.app.storage"

### stop

Stop a running appliance.

Args:
* domain: full domain name of the appliance to be stopped