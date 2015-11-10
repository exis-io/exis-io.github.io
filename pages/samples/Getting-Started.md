# Getting Started

Learn how to set up a project to communicate over the fabric. You can also download preconfigured projects. 

# iOS

Download preconfigured projects here. If you publish the app you will have to change the name.

__Warning:__ Xcode versions below 7.0 are not supported. Additionally, Xcode 7.1 has some conflicts with cocoapods 0.38. If you run into errors with `importing modular import in non modular framework` delete the directory `Pods/Headers/Private`.

iOS app only: download [zip](https://github.com/exis-io/SwiftStarterIOS/archive/master.zip) or clone using git:

```
git clone git@github.com:exis-io/SwiftStarterIOS.git
```

iOS and Backend Container: download [zip](https://github.com/exis-io/SwiftStarterIOSBackend/archive/master.zip) or clone using git: 

```
git clone git@github.com:exis-io/SwiftStarterIOSBackend.git
```

## Manual Configuration

__Warning:__ this section is slightly out of date. Download one of the sample projects provided above. 

Set up an Xcode project as an iOS app frontend and Swift container running as a backend. To create the project without the backend, skip the steps marked *Container*.

Create a new empty iOS project. Select `Single View Application`. 

![Missing Image!](/img/setup/ios/1.png)

![Missing Image!](/img/setup/ios/2.png)

**Container:** Go to *File > New > Target*. Select *OSX Console* as the type.

![Missing Image!](/img/setup/ios/3.png)

![Missing Image!](/img/setup/ios/4.png)

Create a plaintext file called *Podfile* and save it in the same directory as the newly created project.

iOS Only:
```
# Tell cocoapods what kind of application we're making
platform :ios, '9.0'

# Required when libraries have swift code in them 
use_frameworks!

# The dependency we want to use. You can add more here if you'd like!
pod 'Riffle'
```

iOS and Backend:

```
use_frameworks!

target :ExisAgainst, :exclusive => true do
  platform :ios, '9.0'
  pod 'Riffle'
end

target :Backend, :exclusive => true do
  platform :osx, '10.10'
  pod 'Riffle'
end

```

![Missing Image!](/img/setup/ios/5.png)

Close the Xcode project. Open a terminal and navigate to the directory you saved your project using the `cd` command. Install the pods with `pod install`.

Open the newly created *.xcworkspace* file in the project directory-- **not** the *.xcproject* file.

**Container:** Open project settings by clicking the project name (with the blue icon) in the project navigator. Select your OSX console app in the targets pane. Click on *Build Phases*. Click the plus button and *New Run Script Phase*. Paste the following:

```
"${SRCROOT}/Pods/Target Support Files/Pods-Backend/Pods-Backend-frameworks.sh"
```


![Missing Image!](/img/setup/ios/6.png)

![Missing Image!](/img/setup/ios/7.png)


Select the *Pods* project in the project navigator. Select the `Pods-ExAgainst-Riffle` target. Click *Build Settings*. Search for *contains swift* and change the `Embedded Content Contains Swift Code` to `Yes`. Repeat for the `Pods-Backend-Riffle` framework.

![Missing Image!](/img/setup/ios/10.png)

![Missing Image!](/img/setup/ios/11.png)


In *ViewController.swift* add *import Riffle*. Run the project-- even if it has errors. 

![Missing Image!](/img/setup/ios/8.png)

**Container:** Change the current target to the OSX console app. Add the import to *main.swift* add run again. Ignore the error messages that appear before *Hello, World!*. They're warnings that arise when using Swift libraries in an OSX application. 

![Missing Image!](/img/setup/ios/9.png)



<!-- 

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/1.PNG)

Enter an app name. The examples use `ExAgainst` as the name. Remember the folder where you save the project, you'll need to find it again soon! Here we've saved it into the directory `~/Documents/ios/`.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/2.PNG)

The riffle libraries are distributed as `pods` through cocoapods. Check out more information about cocoapods at their [website](https://cocoapods.org/). To check if you have cocoapods installed, open the *Terminal* application and type `pod`. If you see something like this (the colors may not match) then you're ready to go with cocoapods.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/10.PNG)

If you don't have cocoapods installed, now would be a good time. Follow the instructions on the home page from the link above. Cocoapods relies on [RubyGems](https://rubygems.org/pages/download), a dependency manager for the ruby language. You'll need that too. 

In order to install riffle you'll first have to create a `Podfile`. This is a simple text file that lists dependencies in Ruby. You can either use your favorite text editor for this or the built in TextEdit app available in OSX. The example below shows TextEdit. Be cafeul-- if you use TextEdit you'll need to convet it to *plaintext* before saving it.

Enter this into the `Podfile`: 

```
# Tell cocoapods what kind of application we're making
platform :ios, '9.0'

# Required when libraries have swift code in them 
use_frameworks!

# The dependency we want to use. You can add more here if you'd like!
pod 'Riffle'
```


![Missing Image!](/img/ios-cards-tutorial/app/1-setup/4.PNG)

Save the file as `Podfile` (with no *.txt* extension!) in the same directory that you made your project.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/5.PNG)

Cocoapods is used through the command line, or `Terminal` application in OSX. Find it in the application window or spotlight. Once open, you'll need to navigate to the directory where you saved the project. 

Change directory to the save location of the project. The second part of the command may be different for you if you saved the project to a different directory!

```
cd ~/Documents/ios/ExAgainst
```

Once in the directory instruct cocoapods to fetch all dependencies. This will load all the libraries you'll need to use for this project. 

```
pod install
```

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/6.PNG)

Close any open Xcode windows you may have open. Cocoapods doesn't just copy code into your project, it creates new projects for each component and combines them into a `workspace`. Don't worry, everything should look the same! Navigate to the folder you saved the project in and open the `.xcworkspace` file-- not the `.xcproject`!

Here's what the newly created project looks like. Note the `Pods` project below your project in the file navigator. Import riffle by adding the import to the top of the view controller: 

```
import Riffle
```

Run the project and make sure it builds.

__Warning:__ Xcode sometimes gets a little lost and reports errors when none exist. Try building even if an eror appears. Once it goes through the process of building the libraries the errors may dissapear.

__NOTE:__ Xcode `7.1` introduces some issues with Cocoapods, the dependency manager. If you see errors relating to `import of non-modular header...` you will have to delete the `Pods/Headers/Private` folder from your project directory. Check your version of xcode: ![Missing Image!](/img/ios-cards-tutorial/app/1-setup/3.PNG)

 

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/7.PNG)

__NOTE:__ if you see an error on build and you have Xcode 7.1 you'll need to setup a quick workaround. Open the finder and navigate to the project folder. Delete the directory `Pods/Headers/Private` and rebuild. 


## Setting up OSX App

The process for setting up an OSX application is the same as for the iOS version. Make sure to choose `OSX Application` on the left pane in the new project wizard and `Command Line Tool` in the right pane. **NOTE: `Command Line Tool, not Cocoa Application**.

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/8.PNG)

Repeat the same steps as for the iOS application. You'll need to tweak the `Podfile` to tell cocoapods about our platform: 

```
platform :osx, '10.10'

use_frameworks!

pod 'Riffle'
```

Once the dependencies are installed and you have the workspace open go the project. Add `import Riffle` to the top of *main.swift* and run the project. You should see `Hello, World!` appear in the console log. Don't worry about the error warnings that appear above it. Unfortunately, Swift libraries and OSX applications don't play nicely just yet. Its still a very new language, and there are some kinks to work out!

![Missing Image!](/img/ios-cards-tutorial/app/1-setup/9.PNG)

The last step in setting up the OSX app is to let Xcode know the *Riffle* libraries contain swift code. If you ever see errors like this:

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/3.PNG)

Then you forgot to do this step. 

1. In the left-side pane, or the *Project Navigator*, click on the *Pods* project with the blue icon. 
2. Select the `Riffle` target on the left side of the newly opened options pane. It has a yellow toolbox next to it.
3. Go to `Build Settings` 
4. Type in *"contains swift"* in the search bar on the options pane
5. Find the setting `Embedded Content Contains Swift Code` and set it to `Yes`

![Missing Image!](/img/ios-cards-tutorial/app/2-hello/4.PNG) -->