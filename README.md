# Jog 

This codebase contains the Jog website and the Jog app. We suggest you clone it twice - once for each.

### Tech Stack

* ECMAScript 6
* Typescript
* React
* React Native
* Redux
* Webpack
* Git submodules
* Testing
    * CircleCI
    
### Git Submodule

Some of the code for this project is in a submodule (shared with the jog-api project)

You must make sure you have access to that repo as well. I'd recommend checking it out first seperately. It will get checked automatically out after you run `yarn install` or `npm install`.

### Continous Integration

We've built this project in https://circleci.com it's very easy to setup and the config is already committed `circel.yml`. 

## Website

### Prerequisite installs

Node 8 latest version (use `nvm` if possible)

### Setup

Open `package.json` make sure: `"react": "^15.6.1"`

```bash
nvm use 8
rm -rf node_modules #(if present)
npm install
```



### Running

`npm run run:web`

then navigate to http://localhost:3000

### API ENDPOINT
You can manually set the API endpoint using this environment variable.

`JOG_WEB_API_ENDPOINT="http://localhost:5000" npm run run:web`

### Deployment

The site is deployed to [firebase](https://firebase.google.com/docs/hosting/).

Deploy it with: `npm run deploy:web:dev` and `npm run deploy:web:prod`. 

## App

The App works on both Android and iOS. 

### Prerequisite installs

Node 7 latest version (use `nvm` if possible)

All the usual React Native installs:
https://facebook.github.io/react-native/docs/getting-started.html

(Hit building projects with native code, macos, ios and android)

We've run the project using xcode 8.3.3 and 9.0. https://stackoverflow.com/questions/10335747/how-to-download-xcode-dmg-or-xip-file

yarn: `npm install -g yarn`

Install `fastlane` (for deployments etc.): https://github.com/fastlane/fastlane#installation (recommend using brew or standalone installer script to avoid ruby problems).

### Setup

Open `package.json` make sure: `"react": "16.0.0-alpha.6"`

```bash
nvm use 7
rm -rf node_modules #(if present)
yarn install
```

#### Get the provisioning profiles

We use fastlane match to manage the provisioning profiles. Which makes setting up new team members much easier.

`fastlane match --readonly`  <- todo: this is wrong

### Running

`yarn start:packager` to run the packager.

#### iOS

`open ios/jog.xcworkspace` Note: you must open .xcworkspace file *not* project file.

#### Android

Run on the commandline with `react-native run-android`

or: open the `./android` folder in android studio and hit play. Don't let Android studio change any of the files though / upgrade gradle or similar.

### Deployment

```bash
yarn deploy:android:alpha
yarn deploy:ios:beta
```

You can then login to the play store and itunes connect to see the builds and use play store / testflight to install them to a device.




