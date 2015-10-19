A generic software component developed by any individual or group. Accessible as a service through common [[messaging patterns|Message]] to developers creating applications that use exis. 

Appliances have to be [[injected|Injection]] to a developer's [[domain|Domain]]. The developer does not gain access to the code of the underlying appliance. Each appliance has specific publicized endpoints that developers may used to interact with the appliance. 

Appliances are categorized by their broad purpose and their level-- perceived complexity, security, or utility. Levels range from 1 to 3. The level of an application is indicated with parenthesis following the name of the appliance. 

While useful as a tool for organization, an appliance's level may also imply some restriction or different behavior upon the owning domain. For example *Auth (3)* is more secure than *Auth (1)*-- some components of the fabric may behave differently when interacting with the more secure domain. 


## Requirements

An appliance should belong to the developer using it without giving that developer control of the appliance itself. Similarly, the creator of the appliance should not be able to access the developer's data in the appliance. 

Creators of an appliance should be able to charge for usage using a predetermined payment structure. The creators should not have to implement the payment scheme themselves. 

Developers should be able to add appliances to their domain.
