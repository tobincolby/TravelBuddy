# TravelBuddy React Application
This is the react-native application used to build this.

## Requirements
You must have the most up-to-date Mac OS (10.15.4), and must have the most up-to-date XCode (11.4.1) installed on your computer to run. Otherwise it will fail. Additionally, you need to have the iPhone X simulator installed within XCode. (There is a weird build error I was not able to solve when running locally, but it exports to all real devices fine.) You will also need npm installed on your computer as well. Additionally, chrome is required to build in debug mode for react-native.

## How To Run

1. Make sure that TravelBuddyServer Flask server is running at http://127.0.0.1:5000/

1. Point the path to the local node_modules folder

```bash
export PATH="./node_modules/.bin:$PATH"
```

2. Run the following command to build the iOS application.

```bash
react-native run-ios
```