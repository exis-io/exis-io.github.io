# Hello Ionic!

Following this tutorial will result in creating an app that enables client to backend API calls, between an Ionic app, and a Nodejs server.

__NOTE__: Use **templates** to finish this tutorial in two clicks by following the image below. This template will launch an app and install all containers required for this tutorial. The only step you would need to complete is to copy your `me` token into the ionic app (found under [Auth Management](https://my.exis.io/#/auth_tokens/ionic) in the Ionic app) and place it in your app ([instructions](/pages/tutorials/ionic/HelloIonic.md#enter-the-me-token-for-credentials)).

![Template](/img/tutorials/ionic/helloionic_template.png)

**A step by step guide to what the template does is provided below.**

## Fork hello-nodejs

Fork the `hello-nodejs` repo [here](https://github.com/exis-io/hello-nodejs), we will use this in a bit.

## Setup the app

[Register][register] for an account or [login][login].

### Create a new app named "ionic"

![Create App](/img/tutorials/templates/web_create_app.png)

### Add an **Auth** appliance

**Use the options:** *Temporary (name, no password)* for the *User account type*

This appliance controls who is allowed to communicate with your backend.

![Auth](/img/tutorials/templates/web_attach_auth.png)

### Attach a **Container** appliance

This appliance hosts your Nodejs backend code in the cloud.

![Container](/img/tutorials/templates/web_attach_container.png)

### Go to [Container Management](https://my.exis.io/#/containers/ionic)

**Build the image** by passing in your *forked* repo URL of `hello-nodejs` from above, name it `hello`.

![Build Image](/img/tutorials/templates/web_container_buildimage.png)

**Create the image** from the dropdown on the left, call it `hello`.

![Create Image](/img/tutorials/templates/web_container_createimage.png)

**Start the container** by pressing the `Start` button below.

![Start Image](/img/tutorials/templates/web_container_startimage.png)

## Setup Ionic App

```
git clone git@github.com:exis-io/hello-ionic.git
cd hello-ionic
bower install
```

### Tell the Ionic app what **domain** to use

Replace `REPLACEME` with `xs.demo.USERNAME.ionic` in `www/js/app.js` line 27:
```
.config(function($riffleProvider){
    $riffleProvider.setDomain("REPLACEME");
})
```

## Run the Ionic App

```
ionic serve
```

This will provide the following screen:

![Ionic app](/img/tutorials/ionic/home.png)

Messages can now be sent between the client and backend. This is a simple `echo` server, more advanced tutorials are soon to come.

__TOCTAGS__
