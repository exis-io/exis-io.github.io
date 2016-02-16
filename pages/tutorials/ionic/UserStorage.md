# Exis as a Backend + Ionic!

Following this tutorial will result in creating a simple social media status posting app using Exis as a backend and Ionic as a frontend. This tutorial will showcase some of the core features that make Exis an excellent choice for app development including, user registration and authentication, and private and public user storage.

##Get Up and Running!
###Step 1
[Register][register] for an account or [login][login].
###Step 2
Create a new app named "userstorage"
![Create App](/img/tutorials/templates/web_create_app.png)
###Step 3
Add an **Auth** appliance

**Use the options:** *Persistent (name, password, and email address)* for the *User account type*

This appliance controls who is allowed to communicate with your backend.
![Auth](/img/tutorials/templates/web_attach_auth1.png)
###Step 4
Clone the Ionic App
```
git clone https://github.com/exis-io/Ionic-UserStorageDemo.git
bower install
cd Ionic-UserStorageDemo
```
###Step 5
Link your Ionic App to the Exis App you just created

Replace `USERNAME` with your Exis username in `xs.demo.USERNAME.ionic` in `www/js/app.js` line 81:

```
.config(function($riffleProvider){
    $riffleProvider.SetDomain("xs.demo.USERNAME.userstorage");
})
```
###Step 6
Run the Ionic App!

```
ionic serve
```

This will provide the following screen:

![Ionic app](/img/tutorials/ionic/userstorage-login.png)

###Congrats on Building Your First Ionic App Using Exis as a Backend!!

We seeded the app with some users for you. Register and login in for some new accounts and play around with the demo. You can launch two instances in different windows of your browser and login with different users to verify that posts are being saved in real time. Follow a user in one window and then go to My Feed. In the other window update the status of the user that was just followed and if you pull down to refresh in the original window the status will be updated. If you want to see how you can use Exis to publish status updates so that changes are instantly reflected without the need for a refresh look at the advanced section of this tutorial [here](/pages/tutorials/ionic/UserStorage.md#live-publishing).


**A step by step explanation of our code is provided below.**

##Learn How It Works!
###Topics

1. [Login and Registration](/pages/tutorials/ionic/UserStorage.md#login-and-registration)
2. [User Object and User Storage](/pages/tutorials/ionic/UserStorage.md#user-object-and-user-storage)
3. [Advanced Topics](/pages/tutorials/ionic/UserStorage.md#advanced-topics)
    * [Live Publishing](/pages/tutorials/ionic/UserStorage.md#live-publishing)
    * [Public Data Queries](/pages/tutorials/ionic/UserStorage.md#public-data-queries)

##Login and Registration

This Section will cover the basics of user login and registration using Exis. In order to use user login and registration on Exis
you need to attach an **Auth** appliance to your app as we did in [Step 3](/pages/tutorials/ionic/UserStorage.md#step-3) of [Get Up and Running!](/pages/tutorials/ionic/UserStorage.md#get-up-and-running-).  You can see the note below for a little more about authentication levels.

__NOTE__: **A little more about the `Auth` appliance:** `Auth` is an applicance which allows you to have users register for and then login to your application and connect to Exis.
There are two levels of authentication which the `Auth` appliance currently supports. **Level 0:** This allows users to login to your application without registering. Users can request a name or connect anonymously to Exis and be given a random user name. User storage is not available with this level of authentication. **Level 1:** This authentication level requires users to register for an account by creating a username and providing an email, name, and password. This level of authentication comes with user storage which allows for users to save both private and public data to the cloud and retrieve it anytime they login again. See the section below on [user storage](/pages/tutorials/ionic/UserStorage.md#user-object-and-user-storage) for more details on how this works.

**For this app we are using Level 1 authentication which requires users to register with their name, email, and password.**

Registration and Login with Exis and Ionic is done with 2 simple calls in the ngRiffle library.

Let's start by looking at the apps Login Controller at `www/js/controllers.js` line 9:

```
.controller('LoginCtrl', function($scope, $state, $riffle, $ionicPopup, $rootScope, Posts) {

  $scope.user = {};

  $scope.login = function(){
    $riffle.login($scope.user).then(loggedIn, error);
  };

  $scope.register = function(){
    $riffle.registerAccount($scope.user).then($scope.login, error);
  };

  function loggedIn(){
    $scope.user = {};
    $state.go('tab.feed');
    $rootScope.me = $riffle.user;
    $rootScope.postService = Posts;
    Posts.load();
  }

  function error(error) {
    $ionicPopup.alert({
      title: 'Oops!',
      template: error
    });
  };
})
```

First we have:
```
$riffle.registerAccount($scope.user)
``` 
This is for registering new users. This function takes an object with the required fields `username`, `password`, `email`, and `name`.
The resulting javascript object looks like
```
{ username: "exis", password: "ExisRocks", email: "developers@exis.io", name: "The Exis Dev Team" }
```
You can store extra fields for later use in the object if you like and they will be ignored by the **registerAccount** function. 
The function returns a promise which will be resolved on successful registration of the user or rejected with an error string on failure. 
In the case of our app on success we call the login function and on error we alert the user with a Ionic Popup with our error string.

Next we can look at:
```
$riffle.login($scope.user)
```
The login function again takes an object but this time the required fields are simply `username` and `password` giving us a javascript object that looks like
```
{ username: "exis", password: "ExisRocks!" }
```
Again you can store extra fields but the login function will simply ignore them. In our app this allows us to use the same `$scope.user` object for registration and 
login if registration was successful. Since Ionic uses AngularJS for 2-way data binding the ```$scope.user``` fields are actually being set in the the view which you can see in the 
`www/templates/login.html` template. 
```
$riffle.login()
```
attempts to login and connect a user to Exis and loads any user data into the `$riffle.user` object if successful. 
Read about the `$riffle.user` [here](/pages/tutorials/ionic/UserStorage.md#user-object-and-user-storage). 
```
$riffle.login()
```
returns a promise which on success is resolved with the `$riffle.user` object and rejected with an error string on failure. 
In our app on successful login we call the **loggedIn** function and on error we again alert the user.
In order to logout and disconnect the users session we can call:
```
$riffle.user.leave()
```

__NOTE__: On a successful login a `$riffle.open` message will also be broadcast throughout your entire app so that any services or controllers that might be listening can be notified
of the login event. Similarly when the session is ended by calling `$riffle.user.leave()` a `$riffle.leave` message is broadcast. **See Example Below**
```
$scope.$on('$riffle.open', function() {
    //We are now logged in so we can do something here...
});
$scope.$on('$riffle.leave', function() {
    //We are now logged out and can do something here...
});
```

##User Object and User Storage
Once a user has successfully logged in and established a connection with Exis the `$riffle.user` object will be created and available to be injected throughout the app.
To make sure you are connected you can check `$riffle.user.connected` which will be either `true` or `false` depending on wheter the user is currently connected to Exis.

If we are connected then the `$riffle.user` will have several fields and methods already available for use.

````
$riffle.user.email    //The email address the user registered with.

$riffle.user.name     //The name the user registered with.

$riffle.user.gravatar //An md5 hash of the users email provided for easy use if they have a gravatar account.

$riffle.user.publicStorage //Set this to an object of your choosing to save any of the users data you'd like to make public to all users of your app

$riffle.user.privateStorage //The same as publicStorage but this object will only be visible to the user

$riffle.user.save() //This function saves the user's public and private storage objects to the cloud Note: This will not update the users email, name, or gravatar

$riffle.user.load() //Reloads the user's data saved in the cloud

$riffle.user.getPublicData() //This function returns a list of every user's public storage object if they have one saved.
```

Let's look in the code to see how these are used in this app. First lets look at the how a user writes a post. Let's look at the Posts service in `www/js/services.js`.
This service was saved to `$rootScope.postService` on login so that it is automatically available in the scope of all our controllers. It handles the main logic of posting, following, and
saving data in this application. Let's look at the post function at **line: 51** to see how we can save a post that all users can see publicly.
```
  api.post = function(status){
    $riffle.user.publicStorage.email = $riffle.user.email;
    $riffle.user.publicStorage.name = $riffle.user.name;
    $riffle.user.publicStorage.status = status.body;
    $riffle.user.publicStorage.statusPhotoUrl = status.photoUrl || null;
    return $riffle.user.save();
  };
```
It's that simple! Set the keys to be stored, in this case `email`, `name`, `status`, `statusPhotoUrl`, and then simply call `$riffle.user.save()` and the object
is saved to the cloud and is now publicly available for other users to retrieve. Anytime save is called whatever is currently in the user's cloud public and private storage
will be overwritten with whatever is currently in the `$riffle.user` public and private storage. To see how to retrieve user's publicly stored objects look at **line: 24**.
```
    $riffle.user.getPublicData().then(loadData);

    function loadData(posts){
        //The posts into the users feed here based on who they're following
    }
```
Simply calling the `getPublicData()` function returns an array of every user's public storage object if they have one saved to the cloud. It is an
asynchronous call which returns a promise so a `.then()` statement is used in order to pass a callback function that will process the data when it is recieved. In this
case the `loadData()` function recieves the posts and then filters them into the feed or the list of people that can be followed depending on whether the user is following
the owner of the post or not.

Not everything a user saves should be publicly available to all users of an app of course. This is what private storage is used for. In this app who a user chooses to follow is saved 
in their private storage in the cloud and is only visible to them. Let's look at **line: 45**.
```
  api.follow = function(email){
    $riffle.user.privateStorage.following = $riffle.user.privateStorage.following || [];
    $riffle.user.privateStorage.following.push(email);
    $riffle.user.save().then(api.load);
  };
```
Here the user's `privateStorage.following` key is loaded or initialized to an empty list if it is `undefined`. We then add the email of the person
that our user wants to follow to the array and save the data to Exis and reload on a successful save. The person that was followed will now show up in the
user's feed and even if the user logs out or logs in on another device the list of who they are currently following will be retrieved from the cloud.

That's the basics of this app. Feel free to dig around in the code and modify it as you wish to see what you can make happen. There are a few more advanced features below you 
can read about such as how to use a `publish` call so that users will see status updates reflected instantly if they are connected without the need for refresh read about that [here](/pages/tutorials/ionic/UserStorage.md#live-publishing). Also you can read about how you can pass queries to the `getPublicData()` function using mongoDB query syntax in order to filter and sort the data you are trying to retrieve.
Read about that [here](/pages/tutorials/ionic/UserStorage.md#public-data-queries).


##Advanced Topics
__NOTE__: The below topics add some extra functionality to this app and demonstrate a few of the features that make Exis so powerful.

###Live Publishing

For live publishing to work you'll need to add permission for users of your app to publish and subscribe to the `statusUpdate` endpoint. Go to [permissions management](https://my.exis.io/#/permissions/userstorage)
in you developer dashboard on [my.exis.io](https://my.exis.io/#/permissions/userstorage) and add a new endpoint `/statusUpdate` to the user role and give users publish and subscribe privilege. 
![Perms](/img/tutorials/ionic/userstorage-publish-perms.png)

Now when a user posts a status update anyone that is logged in and following the user will immediatly see the updated post in real time without the need to refresh.
![Publish sample](/img/tutorials/ionic/status-update.gif)

Let's start by looking at `www/js/services.js` **line: 8**
```
  $rootScope.$on('$riffle.open', function(){
    $riffle.subscribe("statusUpdate", update);
  });

  function update(email){
    var following = $riffle.user.privateStorage.following || [];
    if(following.includes(email)){
      api.load();
    }
  }
```
Here we can see our post service is subscribing to the `statusUpdate` channel whenever it receives an login broadcast event by using the `$riffle.subscribe()` function and passing in a handler.
Whenever someone publishes to this channel the `update()` handler will be called which will automatically reload the status data if the email being passed is one the user is following.

Now Let's see where the publishing happens by looking at `www/js/controllers` **line: 52**.
```
  $scope.post = function(){
    $scope.postService.post($scope.newStatus).then(publishUpdate);
    $scope.editStatus.hide();
  };

  function publishUpdate(){
    $riffle.publish('statusUpdate', $riffle.user.email);
  }
```
Here we can see that once the user posts their new status successfully the `publishUpdate` function is called which simply uses `$riffle.publish()` to publish the current users email to
the `statusUpdate` channel thus notifying anyone logged in to the app that the user has posted a new status, allowing them to automatically reload the data as shown above.



###Public Data Queries
**To see a version of this app that uses queries with mongoDB syntax follow the steps above and checkout the mongo-queries branch**
```
git checkout mongo-queries
ionic serve
```
For all intents and purposes this version of the app functions exactly the same as the original version but it simply demonstrates that you can use query objects using the MongoDB query operators in order
to filter what information you would like returned from the `$riffle.getPublicData()` method. You can read more about MongoDB queries [here](https://docs.mongodb.org/manual/tutorial/query-documents/) if you're interested. A basic example can be see in
`www/js/services.js` **line: 29**
```
var feedQuery = {email: { $in: following } };
$riffle.user.getPublicData(feedQuery).then(loadFeed);
```
The `feedQuery` is a MongoDB query which indicates that only objects that have an email that match an item in the `following` array should be returned. 
This allows us to return only the posts that the current user is following and saves the developer from having to write a function to filter out the other posts in the application itself.

##Thanks For Following This Tutorial!
We hope you've found it enlightening and we hope you continue to explore Exis and discover all the ways in which it can simplify app development! Please don't hesitate to contact us if you have any questions. We're always willing to help. Email us at [developers@exis.io](mailto:developers@exis.io)


__TOCTAGS__
