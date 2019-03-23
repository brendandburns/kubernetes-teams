# Kubermetes Teams

This is a simple app for integrating Kubernetes and teams.

## Installing

### Building the app

```sh
cd ${repo_root}
gulp
```

This should leave an artifact in `manifest/kubernetes-teams-app.zip`

### Installing the app

In teams you should find and launch the `App Studio` application.

Click on the 'Manifest Editor' Tab.

Click on the 'Import an existing App' button.

Select the `kubernetes-teams-app.zip` file from the first step.

### Configuring the app

Once you have created the app, you need to generate an app id.

On the App Details page, click on the 'Generate' button below the app-id.

### Setup the Bot

On the 'Bots' screen, delete the existing Bot. Then create a new Bot.

Note the Bot ID, it should look something like `19855b98-0e1e-4090-9892-4ae4b211bace`

Click on the 'Generate new Password' button. Note this password.

### Configuring the application.

Open `start.sh` in an editor.

Replace `MICROSOFT_APP_ID=<foo>` with the Bot ID from above.

Replace `MICROSOFT_APP_PASSWORD=<bar>` with the Password from the above.

### Running the application

Run `./start.sh` this should start the application on port `localhost:3333`

### Providing an external endpoint

To make teams work properly you need an external endpoint for this server, `ngrok` is a
useful tool for this scenario.

Run: `ngrok http 3333`

Note the `https` address that you have created, it will look something like: `https://f38aced1.ngrok.io`

### Configuring the Teams App

Go back to App Studio. 

Click on the 'Tabs' view, look for 'Tab configuration url', edit that and replace that with
the `ngrok` url including the `/k8s` path, so something like:

```
https://your-app-here.ngrok.io/configure
````

Click on the 'Edit' by the existing tab, and update the URL their to something like:

```
https://your-app-here.ngrok.io/k8s
````



Go to the 'Bots' view, look for the 'Messaging Endpoint' and update the 'Bot Endpoint Address' to be something like 

```
https://your-app-here.ngrok.io/api/messages
````

### Installing your app

Select 'Test and Distribute' in the sidebar.

Select the 'Install' button, this should install your app.

### Communicating with the bot.

Try typing `kubectl get nodes`