# NativeScript Angular
[![Build Status](https://travis-ci.org/NativeScript/nativescript-angular.svg?branch=master)](https://travis-ci.org/NativeScript/nativescript-angular)

This repository contains the code for integration of NativeScript with Angular. 

[NativeScript](https://www.nativescript.org/) is a framework which enables developers to write truly native mobile applications for Android and iOS using JavaScript and CSS. [Angular](https://angular.io/) is one of the most popular open source JavaScript frameworks for application development. The result is a software architecture that allows you to build mobile apps using the same framework—and in some cases the same code—that you use to build Angular web apps, with the performance you’d expect from native code. [Read more about building truly native mobile apps with NativeScript and Angular](https://docs.nativescript.org/tutorial/ng-chapter-0).

The current application in this respository is an android apk for setting daily tasks, reminders and challenges. You can build an IOS app by compiling this application with ios extension ( ns build ios --bundle) there might be some issues for ios as it is soly built for android phones.


## Watch the video explaining Angular and NativeScript
[NativeScript session on AngularConnect conference](https://www.youtube.com/watch?v=4SbiiyRSIwo)

## Explore the examples

The `e2e` apps are meant for testing stuff. You can take a look at these additional sample apps that use the published builds from npm:

* [Hello world starter](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-hello-world-ng)
* [Master-detail template](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail-ng)
* [Drawer navigation template](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-drawer-navigation-ng)
* [TabView navigation template](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-tab-navigation-ng)
* [NativeScript Angular SDK examples](https://github.com/NativeScript/nativescript-sdk-examples-ng)


## Requirements
   
   - Android Sdk
   - Java
   - Android phone or emulator should be installed in the system
   
## Commands for running application
    ```
    npm i
    ns doctor
    ns build android --bundle
    ns run android
    ```
## Values to be added in current user environment variable in windows
    - ANDROID_HOME={ C drive path}/Android/sdk
    - ANDROID_SDK_HOME={ C drive path}/Android/sdk
    - ANDROID_AVD_HOME={ C drive path}/.android/avd
    
   [stackoverflow reference](https://stackoverflow.com/questions/39645178/panic-broken-avd-system-path-check-your-android-sdk-root-value)

## Command to create webconfig file

npx @nativescript/webpack init


## Release procedure

- Update Gradle in AppResource with below definition changes as google upgrades
defaultConfig {
    buildToolsVersion "28.0.3"
    compileSdkVersion 30
    generatedDensities = []
    multiDexEnabled true
    minSdkVersion 28
    targetSdkVersion 30
  }

  - add below attribute in package.json the id will be the applications unique Id used by google to deploy the app (remember to remove when developing)
  "nativescript": {
    "id": "com.vijeth.monthlychallenge"
  }

  - follow instructions in [native-script release](https://v7.docs.nativescript.org/angular/tooling/publishing/publishing-android-apps)