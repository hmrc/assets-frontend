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
$ ./server.sh dev
```


### Running Frontend Tests

The [grunt Karma test runner](https://github.com/karma-runner/grunt-karma) is used to run our frontend tests with the command:

```
$ ./server.sh test
```


### Running the Frontend build

Compiles the assets for production.

```
$ ./server.sh build
```

Compiles the assets for npm.

```
$ ./server.sh build --release=$VERSION_NUMBER
```
(Where $VERSION_NUMBER is a string in semver format. i.e. 1.50.0)

### Dependancies

[GOV.UK Elements](https://github.com/alphagov/govuk_elements) pulled in using the Subtree merge strategy.

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


### Syntax

"All code in any code-base should look like a single person typed it, no matter how many people contributed." - [Rick Waldron](https://github.com/rwaldron/idiomatic.js/#all-code-in-any-code-base-should-look-like-a-single-person-typed-it-no-matter-how-many-people-contributed)

* Use [Editorconfig](http://editorconfig.org/#download) when possible.
* Two space indents. Don't use tabs anywhere.
* No trailing whitespace, except in markdown files where a linebreak must be forced.
* Files must end in a new line

More to come in the form of a wiki page...

## License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
