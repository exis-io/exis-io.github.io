*Startup* is the process by which a fabric is bought online. An [[owner|Owner]] is the actor that initiates and oversees this process. 

#### Startup procedure:

* Bring node up
** args: certificate directory
** args: core 
** args: bootstrap (bool)
* Attach means communicate with core node
* Attach core appliances
* Accept new connections

`Certificate directory` points the node to some identity it should use. Required for bootstrapped nodes. 

`Core` is an agent that the node queries for association and positioning information. This functionality is not yet well defined. `Core` is some well trusted delegate of the owner. 

`Bootstrap` affects the startup behavior of the node. If `true`, the node assumes it is the first entry in a new fabric-- a certificate must be provided. If `false` the node attempts to associate with the passed `core`. 


