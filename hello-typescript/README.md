## Nimbella Serverless Cloud

Thank you for trying out Nimbella to deploy a TypeScript serverless project.

### Hello World
We created a starter project on [GitHub](https://github.com/nimbella/demo-projects/tree/master/hello-typescript). The project consists of the following files:

- [`lib/src/hello/Hello.ts`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/lib/src/hello/Hello.ts): a sample function which implements a greeting API.
- [`lib/test/hello/Hello.test.ts`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/lib/test/hello/Hello.test.ts): a file containing unit tests for the sample function, implemented using [Jest](https://jestjs.io/).

- [`lib/build.sh`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/lib/build.sh): a build script which runs the TypeScript compiler to generate JavaScript. The compiled output is webpacked, and the result is used to create the serverless API. The webpack configuration is located in [`lib/src/hello/webpack.config.js`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/lib/src/hello/webpack.config.js). The TypeScript compiler configuration can be found in [`lib/tsconfig.json`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/lib/tsconfig.json).

- [`packages/hello-ts/hello`](https://github.com/nimbella/demo-projects/tree/master/hello-typescript/packages/hello-ts/hello): a directory which will contain the implementation of a serverless API `/api/hello-ts/hello`.
  - [`build.sh`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/packages/hello-ts/hello/build.sh): a shell script for Mac and GNU/Linux platforms, to build and package the functions for deployment to the cloud.
  - [`package.json`](https://github.com/nimbella/demo-projects/blob/master/hello-typescript/packages/hello-ts/hello/package.json): this is a Node.js pacakges file to install dependencies. This sample does not require dependencies.

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
nim project deploy demo-projects/hello-typescript
```

You will see output similar to:

```
Deploying project '/path/to/demo-projects/hello-typescript'
  to namespace 'example-namespace'
  on host 'https://apigcp.nimbella.io'
Started running ./build.sh in nimbella/demo-projects/hello-typescript/hello-ts/hello
Still running ./build.sh in nimbella/demo-projects/hello-typescript/hello-ts/hello
...
Finished running ./build.sh in nimbella/demo-projects/hello-typescript/hello-ts/hello
Deployment status recorded in 'hello-typescript/.nimbella'

Deployed actions ('nim action get <actionName> --url' for URL):
  - hello-ts/hello
```

#### 3. Run your serverless API

```
nim action invoke hello-ts/hello --param name World
```

This will show the following result:

```
{
  "body": "Hello, World!"
}
```

The API you deployed can be used from the browser or via `curl`, Postman, or your favorite API testing tool.
To get the URL for the API run the following command.

```
nim action get hello-ts/hello --url
```

You may pass parameters either as query parameters or as JSON content. Here are two examples using `curl`.

```
> curl `nim action get hello-ts/hello --url`?name=typescript
Hello, typescript!
```

```
> curl `nim action get hello-ts/hello --url` \
  -X POST \
  -H 'content-type: application/json' \
  -d '{"name":"again"}'
Hello, again!
```

### Running the tests

This example includes unit tests in the `lib/test` directory. You can run the tests as shown below.

```
cd lib
npm install
npm run test
```

### Support and Feature Requests

We welcome your feedback and thoughts on what features will be helpful to make your serverless journey a success.

- For general bugs and enhancements, we suggest opening [an issue on GitHub](https://github.com/nimbella/nimbella-cli/issues/new).
- For quick questions, you can reach us in [Slack](nimbella-community.slack.com).
