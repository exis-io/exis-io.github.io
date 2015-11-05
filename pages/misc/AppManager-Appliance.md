The AppManager is a stopgap appliance to handle creation of applications.
Once logged in, a user will make calls to xs.appmanager to create apps, get a list of running apps, and other app-related functions.

TODO - needs some ways to change app settings, this will be done in the future but not this week
NICK  
- you should call pd.launcher/list_available, which will return a array of possible appliances to add  
  
```
    [
      {'name': 'storage', 'description': 'stores things': options: []},
      {
           'name': 'auth', 
           'description': 'handles all authentication - must be used', 
           'options': See Below | None(if no options) 
      }
    ]
```
OPTIONS FORMAT
```
    [
      {
        type: 'checkbox|text|number|select',
        label: 'label for option',
        name: 'key used for returning value',
        choices: 'null(for checkbox,text,number)|[{title: 'opt name', value: value},{title: 'another', value: value2},...],
        pattern: 'regex for text match'|null(if type != text)',
        patternError: 'error explaining expected pattern'| null
      },
      {
        type: ...
      },...
    ]
```
- you should display all these appliances in a list, which is of format (checkbox, applianceName, applianceDescription, applianceOption1Dropdown, applianceOption2Dropdown)
- you should either gray out auth/launcher because they are checked by default, but still allow them to change options for these


# API

### create_app
Args:  
* appname: the name of the appname, will be converted to xs.user.appname as a fulldomain
* appdescription: a short description of the app
* startAppliances[] - a list of dicts for all starting appliances



startAppliances format:  

    [
      {'name': 'auth', 'options': {'useEmail': False}},
      {'name': 'launcher', 'options': []},
      {'name': 'storage', 'options': []},
      {'name': 'registrar', 'options': {'useEmail': False}},
    ]


Functionality:  
1. Check appmanager db in Mongo, determine if app already exists and return failure if so  
2. Create the application in the database (appmanager), with a creation time, and registerLevelForAuth  
3. Call `xs.launcher/start(xs.mb/app1, auth)`  
4. Call `xs.launcher/start(xs.mb/app1, launcher)`
5. For any other appliances, Call `xs.launcher/start(xs.mb/app1, startAppliances[i])` 



### list_apps
Args:  
* NONE: the user will be automatically passed

Returns a dictionary of all apps owned by user. Will contain all necessary information.
Should be of form 

    [
       {   'name': 'chatapp'
           'description': 'coolchatapp'
           'creationDate': 34902834,
           'appliances': [
                     {'name': 'auth', 'options': {'useEmail': False}},
                     {'name': 'launcher', 'options': {}}

                         ]
       },
       { 'name': 'app2',
          ...
       }
    ]

### delete_app
Args:  
* appname: the domain of the app, which will be expanded by appmanager to full domain

Should delete the app from the appmanager db, call launcher to stop auth/launcher in domain.