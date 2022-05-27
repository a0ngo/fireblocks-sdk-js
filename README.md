## The Official Javascript & Typescript SDK for Fireblocks API
[![npm version](https://badge.fury.io/js/fireblocks-sdk.svg)](https://badge.fury.io/js/fireblocks-sdk)

### About
This repository contains the official Javascript & Typescript SDK for Fireblocks API.
For the complete API reference, go to [API reference](https://docs.fireblocks.com/api/swagger-ui/).

## Usage
#### Before You Begin
Make sure you have the credentials for Fireblocks API Services. Otherwise, please contact Fireblocks support for further instructions on how to obtain your API credentials.

#### Requirements
- [node.js](https://nodejs.org) v6.3.1 or newer

#### Installation
1. Download \ clone the repo to a location directory. Note: this directory will be used in your code, make sure it is secure and proper permissions are applied to the directory.
2. Install the package and all needed dependencies - this opertaion will save this branch as the fireblocks-sdk npm package on the device:
```
cd <PATH/TO/YOUR>/project
npm install --save <PATH/TO/>fireblocks-sdk
```

#### Importing Fireblocks SDK
Prior to running the code make sure to create a .env file in the locaiton from which your API script is running with the following structure:
```
awsAccessKey=/* AWS Access Key */
awsSecretKey=/* AWS Secret Key */
awsRegion=/* AWS Region */
awsKeyId=/* AWS Key Id from KMS */
fbksApiKey=/* Fireblocks API Key */
```

JavaScript:
```
const FireblocksSDK = require('fireblocks-sdk').FireblocksSDK;
const AWSAuthProvider = require('fireblocks-sdk').AWSAuthProvider;
const Credentials = require('aws-sdk').Credentials;

// Instantiate SDK using provider only.
let awsProvider = new AWSAuthProvider();
let fireblocks = new FireblocksSDK(awsProvider);

// Instantiate SDK using provider with custom timeout
let fireblocks = new FireblocksSDK(awsProvider, {timeoutInMs:4000});
```

TypeScript:
```
import { AWSAuthProvider, FireblocksSDK } from "fireblocks-sdk";
import { Credentials } from "aws-sdk";

// Instantiate SDK using provider only.
let awsProvider = new AWSAuthProvider();
let fireblocks = new FireblocksSDK(awsProvider);

// Instantiate SDK using provider with custom timeout
let fireblocks = new FireblocksSDK(awsProvider, {timeoutInMs:4000});

```
