# Usage Monitoring

For awareness of resource utilization, we need the ability to collect coarse statistics about appliance and node usage.  Examples of coarse statistics would be number of bytes and objects in storage and number of message (registers, calls, publishes, and subscribes) events produced.

## Conventions

* We favor pulling over periodic pushes.  This design decision allows us to increase or decrease measurement overhead by making a configuration change in one place rather than everywhere in the network.

* We favor reporting measured values rather than differences.  The consumer of the data can always subtract to find the change over a desired time window.

* In the cases where there are counters that reset to zero when a process starts, it is recommended to include a **start** field in the data return by `getUsage`.  Assuming the system clock is reasonable, the **start** field can be the Unix timestamp from when the counters were initialized.  This passes on enough information to the receiver about when the counters were reset.

## Appliance Usage

Every appliance is asked to register a `getUsage` function.  The return value should be a dictionary of values that are relevant metrics for that appliance.  For example, _number of documents_ is meaningful for a [[storage|Store-Appliances]] appliance but not for a [[container|Container-Appliances]] appliance.  Interpretation of the usage data will be left to the consumer of that data.

## Node Usage

Nodes should track usage similarly to appliances.  For nodes, the relevant counts are for the four types of messages (registers, calls, publishes, and subscribes) and the network traffic associated with those messages. We must also track metrics such as the number of active agents connected to the node, as well as the number of failed connections (due to invalid security keys, etc..)

