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
This fork contains two approaches to create an AWS Auth Provider:
- Using a preconfigured Auth Provider.
- Supplying information to build an auth provider.

JavaScript:
```
const FireblocksSDK = require('fireblocks-sdk').FireblocksSDK;
const AWSAuthProvider = require('fireblocks-sdk').AWSAuthProvider;
const Credentials = require('aws-sdk').Credentials;

// Needed values
const apiKey = ....;
const awsCreds = new Credentials(/* Access Key Id */, /* Secret Access Key */);
const awsRegion = 'eu-west-1';
const awsKeyId = ....;

// Instantiate SDK using provider only.
let awsProvider = new AWSAuthProvider(awsCreds, awsRegion, awsKeyId, apiKey);
let fireblocks = new FireblocksSDK(awsProvider);

// Instantiate SDK using provider with custom timeout
let fireblocks = new FireblocksSDK(awsProvider, "https://api.fireblocks.io", {timeoutInMs:4000});

// Instantiate SDK using information instead of provider only.
let fireblocks = new FireblocksSDK(undefined, "https://api.fireblocks.io", undefined, awsCreds, awsRegion, awsKeyId, apiKey);

// Instantiate SDK using information instead of provider only with custom timeout.
let fireblocks = new FireblocksSDK(undefined, "https://api.fireblocks.io", {timeoutInMs:4000}, awsCreds, awsRegion, awsKeyId, apiKey);
```

TypeScript:
```
import { AWSAuthProvider, FireblocksSDK } from "fireblocks-sdk";
import { Credentials } from "aws-sdk";

// Needed values
const apiKey = ....;
const awsCreds = new Credentials(/* Access Key Id */, /* Secret Access Key */);
const awsRegion = 'eu-west-1';
const awsKeyId = ....;

// Instantiate SDK using provider only.
let awsProvider = new AWSAuthProvider(awsCreds, awsRegion, awsKeyId, apiKey);
let fireblocks = new FireblocksSDK(awsProvider);

// Instantiate SDK using provider with custom timeout
let fireblocks = new FireblocksSDK(awsProvider, "https://api.fireblocks.io", {timeoutInMs:4000});

// Instantiate SDK using information instead of provider only.
let fireblocks = new FireblocksSDK(undefined, "https://api.fireblocks.io", undefined, awsCreds, awsRegion, awsKeyId, apiKey);

// Instantiate SDK using information instead of provider only with custom timeout.
let fireblocks = new FireblocksSDK(undefined, "https://api.fireblocks.io", {timeoutInMs:4000}, awsCreds, awsRegion, awsKeyId, apiKey);

```
