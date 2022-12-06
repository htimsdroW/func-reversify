# Azure Function Backend of Wordsmith

This projects contains the azure function app service that acts as the backend for the Wordsmith web app. There are two functions, fn-reversify and fn-history, both of which are HttpTriggered functions. The former accepts a string body and returns a _reversified_ version of it; and the latter accepts two path parameters and returns a JSON array with recent submissions.

## Functions

### fn-reversify

The reversify function listens to `POST /api/reversify`. The body, which should be plain/text, is reversed and then returned as a response to the incoming http request. However, there is also an additional out binding that inserts the submission into the history Azure Table.

### fn-history

The history function listens to `GET /api/history/{partitionKey}/{take}`. The partitionKey parameter is the partition of the history Azure Table from which submissions should be fetched. Currently, submissions are partitioned by year of submission. Non-integer value will not match this parameter. The take parameter is the number of submissions to retrieve. It must be a whole number and can be 20 at most.

Whereas fn-reversify has an Azure Table out-binding, fn-history uses an Azure Table in-binding, this means that data is available to the function as part of the incoming context.

## Tooling

- This project is written in Node.js 18. Earlier versions may not run as intended.
- [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools) is required to run the function in a local environment.
- [Azure Emulator](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio) can be used to emulate the reversify history table locally.

## Setup

To get a dev environment up-n-running, run `npm install` and install the tooling mentioned above. To get the local azurite database to work, you must include `"AzureWebJobsStorage": "UseDevelopmentStorage=true"` as a value in the `local.settings.json` file that should be in your root folder. If none exists (or is generated for you), please use this one instead:

```
{
  "IsEncrypted": false,
  "Host": {
    "LocalHTTPPort": 7071
  },
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

> Enquire one of the project owners for access to the live cloud environment if you think you should have it.

### Host at new location

If you want to host this project in another location, follow [this](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-function-app-portal) guide to create your own Azure Function app service. The storage account used for the persisted history should be created automatically, follow [this](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create) to create one. They must reside in the same resource group and you may have to manually insert the tables connection string in the function app's configuration.

## Release

Continuous development was set up using Azure's source control integration for [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment). Any commits to the main branch are built and tested, and, if both succeed, the code is automatically deployed to the service. **NOTE**: do not give unknown people merge-rights to main.

## Configuration

This project uses composite TypeScript config files, all components of which can be found in the /configs folder. The `build.json` and `test.json` files extend the `base.json` file, which, in turn, contains the core configuration. Configuration that is either build or test specific should be put in corresponding configuration file.

## Scripts

### build

To build the project, run `npm run build`. This will transpile the project using the `config/build.json` configuration.

### start

There are two scripts for starting the project. Both require that [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools) is installed and available.

To start the server in http mode, run `npm run start`.

To start the server in https mode, run `npm run start-https`.

### test

There are two scripts for running tests.

To run the test suite once, run `npm run test`.

To invoke a watcher that runs the test suite continuously on changes, run `npm run test:watch`.

### Formatting & Linting

To run the prettier, run `npm run format`.

To run the linter, run `npm run lint`.

**Note**: the linter is in check-mode and will not write to file.
