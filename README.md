UI Composer lets you **share more code between web and native apps while improving, rather than sacrificing, DX, performance, and code maintainability**.

# Setup

## Expo setup

1. Install eas cli from Expo

https://github.com/expo/eas-cli

```shell
npm install -g eas-cli
```

2. Ask to be added as collaborator

Ping @kmartinezmedia to be added to project

3. Create an expo account

https://expo.dev/signup

4. Login to expo via eas cli

```shell
eas account:login
```

## Setup node

```shell
nvm use
```

If you don't have the version installed follow instructions from nvm then set the installed version with the `nvm use` command.

---

## Install packages

```shell
yarn install
```

# Mobile app

https://docs.expo.dev/development/introduction/#what-is-an-expo-dev-client

```shell
Run yarn nx run mobile-app:build:ios:local
```

## Build commands

| Platform | Profile     | Command                                            |
| -------- | ----------- | -------------------------------------------------- |
| all      | local       | `yarn nx run mobile-app:build-all-local`           |
| all      | development | `yarn nx run mobile-app:build-all-development`     |
| all      | staging     | `yarn nx run mobile-app:build-all-staging`         |
| all      | production  | `yarn nx run mobile-app:build-all-production`      |
| ios      | local       | `yarn nx run mobile-app:build-ios-local`           |
| ios      | development | `yarn nx run mobile-app:build-ios-development`     |
| ios      | staging     | `yarn nx run mobile-app:build-ios-staging`         |
| ios      | production  | `yarn nx run mobile-app:build-ios-production`      |
| android  | local       | `yarn nx run mobile-app:build-android-local`       |
| android  | development | `yarn nx run mobile-app:build-android-development` |
| android  | staging     | `yarn nx run mobile-app:build-android-staging`     |
| android  | production  | `yarn nx run mobile-app:build-android-production`  |

The `build-ios-dev-client` task generates a Debug build that contains the [expo-dev-client](https://www.npmjs.com/package/expo-dev-client) package. A production build is for the general public, and a preview build lets us test on physical devices using eas cloud services, and a development build lets us develop locally.

You can think of the development build as our own custom version of the Expo Go client.

You will only need to generate this build when first setting up the repo or anytime there is a change to a native dependency.

This command will output a tarball to `apps/mobile-app/.expo/**.tgz`.

1. Right click the .expo folder, click `Reveal in finder`
2. Navigate into the .expo directory and find the latest tarball file that was generated
3. Unzip the tarball by double cliking on it and then drag and drop the .app file that was unzipped into the iOS simulator.
4. Repeat these steps each time you add a new dependency which requires a native change and therefore a new app build.

Run the start command to spin up the metro server for live reload of the dev-client we just built.

```shell
yarn nx run mobile-app:start
```

## FAQ

If you run into a fastlane error following the install steps here https://docs.fastlane.tools/getting-started/ios/setup/.

To verify you have fastlane installed correctly run

```shell
fastlane --version
```

If fastlane says you need to install xcode cli tools, but you want to see what xcode-cli-tools version you already have installed, if any, then run:

```shell
softwareupdate --history
```

To install xcode-cli-tools and follow the install manager prompts:

```shell
xcode-select --install
```
