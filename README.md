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


### Running Locally (Development mode)

The command below will kick off a local node.js server on a predefined port (9032). This serves the assets with sourcemaps via the gulp task runner.

```
$ ./server.sh dev
```


### Running JS Tests

The [Karma test runner](http://karma-runner.github.io/) is used to run our JS tests with the command:

```
$ ./server.sh test
```


### Running a Production build

Compiles the assets for production.

```
$ ./server.sh build
```

Compiles the assets for npm. This bumps the version number in `package-build.json`

```
$ ./server.sh build --release=$VERSION_NUMBER
```
(Where `$VERSION_NUMBER` is a string in semver format. i.e. 1.50.0)


## Contributing

1. Fork this repo
2. Create a feature branch
3. Push to your fork
4. Open a pull request back to this repo


### More info

Check out [the wiki](https://github.com/hmrc/assets-frontend/wiki)

## License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
