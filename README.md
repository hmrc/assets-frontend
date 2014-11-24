assets-frontend
===============

Front end assets for the Tax platform


## Using service-manager

Unless you're making changes to the frontend assets, you'll most likely be using [service-manager](https://github.com/hmrc/service-manager) to serve assets to your frontends. The ASSETS_FRONTEND service is responsible for serving released artifacts and can be started with:

```
$ sm --start ASSETS_FRONTEND
```


## Development

### Requirements

* [node.js](http://nodejs.org/download/)
* [grunt](http://gruntjs.com/getting-started#installing-the-cli)


### Running with Grunt (Development mode)

The command below will kick off a local node.js server on a predefined port(9032). This serves the assets with sourcemaps via the grunt task runner.

```
$ ./server dev
```


### Running Frontend Tests

The [grunt Karma test runner](https://github.com/karma-runner/grunt-karma) is used to run our frontend tests with the command:

```
$ ./server test
```


### Running the Frontend build

Compiles the assets for production.

```
$ ./server build
```

### Dependancies


[GOV.UK Elements](https://github.com/alphagov/govuk_elements) pulled in using the Subtree merge strategy.
 
>>>>>>> 4dcdb4cdafd24a0631facdf04e72e78d3eb3fc63
```
$ git submodule init && git submodule update
$ ./update_govuk_elements.sh

```


## Contributing

1. Fork this repo
2. Create a feature branch
3. Bump the `package.json` version number
4. Push to your fork
5. Open a pull request back to this repo
