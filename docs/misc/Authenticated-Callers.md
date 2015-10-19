For certain calls into appliances it is necessary to check who is making the call.  This needs to be done in such a way that the caller cannot spoof it.  For now, we leverage the fact that the node verifies the identity of every agent that connects to it and therefore can have the node supply this identity to the callee.  What should the function signature look like for such a call handler?

Below is a working example in Python of a potentially dangerous function that should act on arg1 and arg2 only if the caller should be allowed according to some criteria known to the appliance.  As long as the caller does not explicitly set disclose_me=false, the caller will be made available to the caller in a special first argument.

```
def dangerous(details, arg1, arg2):
    caller = details.get("caller", None)
    if caller is None:
        return "Error: caller identity not provided (enable disclose_me)"

    # At this point, if we trust the node, we can trust that caller is set appropriately.
    ...
```

If the caller explicitly sets disclose_me=false, the "caller" field will not be present in the details object.  The following Python code will throw an exception in that case.  This might be considered equally valid behavior, since it is an error to proceed with the dangerous function if the caller is anonymous.

```
def dangerous(details, arg1, arg2):
    caller = details["caller"]
    # At this point, if we trust the node, we can trust that caller is set appropriately.
    ...
```

This functionality is enabled by passing a flag when registering the dangerous function.

Example:
```
register(dangerous, "dangerous#details")
```

After the # sign one can provide a comma-separated list of tags that will be interpreted by the node.