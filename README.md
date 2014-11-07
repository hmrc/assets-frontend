assets-frontend
===============

Front end assets for the Tax platform


## Using the Application Manager

Unless you're making changes to the frontend assets, you'll most likely be using the application manager to serve assets to your frontends. The ASSETS_FRONTEND service is responsible for serving released artifacts and can be started with the command below.

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

[GOVUK Frontend Toolkit](https://github.com/alphagov/govuk_frontend_toolkit) pulled in using the Subtree merge strategy.

```
$ git submodule init && git submodule update
$ ./update_govuk_elements.sh

```
