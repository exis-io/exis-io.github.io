Target for a message formed by combining an action and a domain. 

A domain identifies an agent while an action identifies a particular scope of functionality in that domain. 


> V2: endpoints do not imply anything about verbs: one can PUB and SUB to the same endpoint without restriction. We should revisit this. 

##### Example
The user _damouse_ may wish to greet authorized agents with a string indicating his mood. _damouse_'s domain is: 

    pd.damouse

He may choose to expose this functionality under the action:

    /mood

The corresponding endpoint is:

    pd.damouse/mood

## Requirements



## Specification

