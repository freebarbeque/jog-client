# Jog 

##Prerequisite Knowledge

* ECMAScript 6
* React
* React Native
* Flow
* Exponent
* Testing
    * CircleCI
    * Jest
    * Enzyme

##Setup
```bash
yarn install
```

### Simulator

```bash
yarn ios
yarn android
```

### Device

First of all download and run the expo app from the app store or play store then run the following:

```bash
yarn start
```

A QR code will be displayed in terminal - scan this using the expo app to run on your device with hot reload and all the other goodies.

## Testing

### Local

```bash
yarn test # Run tests once
yarn ci # Run linting, flow checks and tests
yarn test:watch # Watch for changes & run tests on each change
```

### CI

Configured in `circle.yml`. Results are at https://circleci.com/gh/z-dev/jog-app for each commit.

## Deployment

### Testing

#### Expo Client

First of all you need to be running XDE, then run the following:

```bash
exp publish
```

#### Testflight

TODO

#### Play Store (Beta)

##### Setup

```bash
# install fastlane
sudo gem install fastlane
# create a private key for signing the APK
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
# configure environemnt variables
set -x JOG_GP_JSON_KEY=/path/to/key.json
set -x JOG_KEY_STORE=/path/to/key.jks
```

##### Deploy

```bash
yarn build:android
yarn deploy:android:alpha 
```




