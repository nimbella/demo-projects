### Mongo Music Demo

This is a port of [an example available on github](https://github.com/willvelida/serverless-mongodb-api), originally designed to run on Azure Functions.  Its author, Will Velida, describes it [in a tutorial](https://towardsdatascience.com/creating-a-restful-serverless-api-with-azure-functions-and-mongodb-6221cfd51a43).

The `LICENSE` is Will Velida's original.  The `project.yml` file and `packages` are in standard Nimbella Deployer format.   Under `packages/mongo-music` you will find portions of the licensed code, altered to run as OpenWhisk actions.

Before deploying this project you need to have access to a MongoDB Atlas instance.  The referenced tutorial will guide you through that part.  You will obtain, in the course of provisioning your MongoDB cluster, a _connection string_.   You should record your connection string and also a choice of database name and collection name (these can be arbitrary) in three variables as follows:

```
MONGO_CONNECTION_STRING=mongodb+srv://...
DATABASE_NAME=albums
COLLECTION_NAME=albums
```

These may be environment variables set in the shell where you will invoke the Nimbella Deployer or, they may be stored in a file.   Then, to deploy this project

```
nim project deploy path/to/mongo-music --env path/to/environment-file
```

If you have stored the variables as process environment variables, you don't need the `--env` part.

To change the original example to its present form we took the following steps.

1.  The original code was a single `.NET` assembly with five functions.  Since each function would be an OpenWhisk action, we separated the code into distinct assemblies.  We happen to use the same name for each assembly but that is not significant.  Right now, only two of the functions have been translated, `CreateAlbum` and `GetAlbum`.
2.  Azure Functions have a distinct structure and signature which includes dispatching and code to serialize and deserialize from the network.  OpenWhisk actions tend to be smaller and simpler with a "dictionary in dictionary out" signature.   In C#, the dictionary is represented as a `JObject` from `NewtonSoft.Json.Linq`.
3.  We changed the way the MongoDB client and its derived handles are cached.  In Azure Functions you can write your own "runner" to hold this kind of soft state.  In OpenWhisk, we rely on global variables which remain initialized when the runtime container is reused for the same action and authenticated user.
4.  A lot of the Azure specific code went away, the logging, in particular.  Note that we can use simple console I/O to write trace messages that will be visible in the `activation record` of each action invocation. 

The actions can be tested using `nim action invoke`.   For example, try

```
nim action invoke mongo-music/CreateAlbum --param AlbumName foobar Artist JoeBlow Price 12.50 ReleaseDate "2020-12-31" Genre misc
```

But, the actions are also _web actions_ and have URLs that expose their functionality directly on the web.

```
nim action get mongo-music/GetAlbum --url
```
will return a URL which you can then visit on the web, adding, eg. `?id=<the id of an album>`.   The album structure will be displayed in the web browser.  Of course client code can use those URLs programmatically as well.  
