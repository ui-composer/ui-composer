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
yarn nx run mobile-app:build
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

The `mobile-app:build` task generates a Debug build that contains the [expo-dev-client](https://www.npmjs.com/package/expo-dev-client) package. A production build is for the general public, and a preview build lets us test on physical devices using eas cloud services, and a development build lets us develop locally.

You can think of the development build as our own custom version of the Expo Go client.

> You will only need to generate this build when first setting up the repo or anytime there is a change to a native dependency.

Once the task completes it should trigger ios Simulator to launch and download the app and spin up the metro server. The tarball with the compressed .app file will be in `apps/mobile-app/.expo/**.tgz`.

## Installing your build on the simulator

> If you haven't installed or run the iOS Simulator before, follow the [iOS Simulator guide](https://docs.expo.dev/workflow/ios-simulator/) before proceeding.

- Once the task completes it should trigger ios Simulator to launch and download the app and spin up the metro server, but if you want to manually add to your simulator or send to someone follow the steps below: 

- Locate the `.tar.gz` file outputted to `apps/mobile-app/.expo/**.tgz`.
- Extract the file by opening it. You will now have a file like `myapp.app`.
- Open up your simulator.
- Drag `myapp.app` into the simulator.
- The app will be installed in a few seconds. When you see it appear on the simulator home screen, tap it to run it.
- You can share this build, it will run in any iOS Simulator.
- Repeat these steps each time you add a new dependency which requires a native change and therefore a new app build.

Run the start command to spin up the metro server for live reload of the dev-client we just built.

```shell
yarn nx run mobile-app:start
```

# Web app

The web app uses vite, https://vitejs.dev/. It's a super simple way to easily spin up a new web app.

To start the web app run.

```shell
yarn nx run web-app:start
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
