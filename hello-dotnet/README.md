## Nimbella Serverless Cloud

Thank you for trying out Nimbella to deploy a .NET serverless project.

### Hello World
We created a starter project on [GitHub](https://github.com/nimbella/demo-projects/tree/master/hello-dotnet). The project consists of the following files:

- [`project.yml`](https://github.com/nimbella/demo-projects/blob/master/hello-dotnet/project.yml): a simple project configuration file. This file can be extended to add `environment` variables or other `parameters` that you want to make available to your APIs (serverless functions).

- [`packages/default/hello`](https://github.com/nimbella/demo-projects/tree/master/hello-dotnet/packages/default/hello): a directory containing the implementation of a serverless API `/api/default/hello`.
  - [`Hello.cs`](https://github.com/nimbella/demo-projects/blob/master/hello-dotnet/packages/default/hello/Hello.cs): this is the code that implements the API.
  - [`build.cmd`](https://github.com/nimbella/demo-projects/blob/master/hello-dotnet/packages/default/hello/build.cmd): a Windows shell script to build and package the functions for deployment to the cloud.
  - [`build.sh`](https://github.com/nimbella/demo-projects/blob/master/hello-dotnet/packages/default/hello/build.sh): a shell script for Mac and GNU/Linux platforms, to build and package the functions for deployment to the cloud.
  - [`.include`](https://github.com/nimbella/demo-projects/blob/master/hello-dotnet/packages/default/hello/.include): this file informs the Nimbella deployer which files to include in the archive used to deploy the function to the cloud.

This demo provides a single serverless API based on the [`.net` 3.1 quickstart](https://github.com/nimbella-corp/openwhisk-runtime-dotnet/blob/master/core/dotnet3.1/QUICKSTART.md) provided by Apache OpenWhisk. The quickstart document provides additional information to create more complex applications. It is not necessary to complete the rest of this tutorial.

### Install the Nimbella CLI

You will need the Nimbella CLI to get started.
Please download the CLI specific for your platform from [https://nimbella-apigcp.nimbella.io/login.html?token=_#cli](https://nimbella-apigcp.nimbella.io/login.html?token=_#cli).

Once you install the CLI, you will need to run:

```
nim login
```

If you do not yet have an account, this will be your opportunity to sign up (it's free and no upfront information is needed except your e-mail or GitHub id).

### Deploy your first project

You are now ready to deploy and run the starter project in three steps.

#### 1. Clone the demo project from GitHub

```
git clone git@github.com:nimbella/demo-projects.git
```

#### 2. Deploy the project
```
nim project deploy demo-projects/hello-dotnet
```

You will see output similar to:

```
Deploying project '/path/to/demo-projects/hello-dotnet'
  to namespace 'example-namespace'
  on host 'https://apigcp.nimbella.io'
Started running ./build.sh in nimbella/demo-projects/hello-dotnet/default/hello
Still running ./build.sh in nimbella/demo-projects/hello-dotnet/default/hello
...
Finished running ./build.sh in nimbella/demo-projects/hello-dotnet/default/hello
Deployment status recorded in 'hello-dotnet/.nimbella'

Deployed actions ('nim action get <actionName> --url' for URL):
  - hello
```

#### 3. Run your serverless API

```
nim action invoke hello --param name World
```

This will show the following result:

```
{
  "body": "Hello, stranger!",
  "statusCode": 200
}
```

The API you deployed can be used from the browser or via `curl`, Postman, or your favorite API testing tool.
To get the URL for the API run the following command.

```
nim action get hello --url
```

You may pass parameters either as query parameters or as JSON content. Here are two examples using `curl`.

```
> curl `nim action get hello --url`?name=dotnet
Hello, dotnet!
```

```
> curl `nim action get hello --url` \
  -X POST \
  -H 'content-type: application/json' \
  -d '{"name":"again"}'
Hello, again!
```

### Support and Feature Requests

We welcome your feedback and thoughts on what features will be helpful to make your serverless journey a success.

- For general bugs and enhancements, we suggest opening [an issue on GitHub](https://github.com/nimbella/nimbella-cli/issues/new).
- For quick questions, you can reach us in [Slack](nimbella-community.slack.com).
