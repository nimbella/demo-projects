### Hello World example for dotnet runtime

This demo provides a single action based on the [`.net` 3.1 quickstart](https://github.com/nimbella-corp/openwhisk-runtime-dotnet/blob/master/core/dotnet3.1/QUICKSTART.md) provided by Apache OpenWhisk.

You don't need to read the Apache instructions to deploy the demo.  Just use `nim project deploy` on it as usual.

Once it is deployed, you can verify it using

```
nim action invoke hello
```

or

```
nim action invoke hello --param name World
```

etc.

Reading the quickstart document can then provide some additional information about what is going on and how to generalize to more complex `.net` scenarios.

