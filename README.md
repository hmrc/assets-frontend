# assets-frontend

Frontend assets for the Tax Platform

[![Stories in Ready](https://badge.waffle.io/hmrc/assets-frontend.png?label=ready&title=Ready)](https://waffle.io/hmrc/assets-frontend) [![Build Status](https://travis-ci.org/hmrc/assets-frontend.svg?branch=master)](https://travis-ci.org/hmrc/assets-frontend) [![devDependency Status](https://david-dm.org/hmrc/assets-frontend/dev-status.svg)](https://david-dm.org/hmrc/assets-frontend#info=devDependencies)

- [Using service-manager](#using-service-manager)
- [Requirements](#requirements)
- [Running Locally](#running-locally-development-mode)
- [Running JS Tests](#running-js-tests)
- [Running tests whilst developing](#running-js-tests-whilst-developing)
- [Running a Production build](#running-a-production-build)
- [Component Library](#component-library)
- [Contributing](#contributing)
- [More info](#more-info)
- [License](#license)


## Using service-manager

Unless you're making changes to the frontend assets, you'll most likely be using [service-manager](https://github.com/hmrc/service-manager) to serve assets to your frontends. The ASSETS_FRONTEND service is responsible for serving released artifacts and can be started with:

```
$ sm --start ASSETS_FRONTEND
```


## Developing Locally

### Requirements

* [Node.js](https://nodejs.org/en/) `>= 0.12.7`
* [npm](https://www.npmjs.com/) `>= 2.11.3`

#### [Node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)

To install multiple versions of Node.js, you may find it easier to use a node version manager:

* [nvm](https://github.com/creationix/nvm)
* [n](https://github.com/tj/n)

#### [nodemon](http://nodemon.io/) (optional)

`nodemon` is used to develop [the Component Library]("#component-library")

It is recommended to install nodemon globally.

```
$ npm install -g nodemon
```

### Running Locally (Development mode)

The command below will kick off a local node.js server on a predefined port (`9032`). This serves the assets with sourcemaps via the gulp task runner.

```
$ ./server.sh dev
```


### Running JS Tests

The [Karma test runner](http://karma-runner.github.io/) is used to run our JS tests with the command:

```
$ ./server.sh test
```

Or to run the tests with a watch task for continuous development, you can run them with:

```
$ ./server.sh test-dev
```

### Running a Production build

Compiles the assets for production.

```
$ ./server.sh build
```

## Component Library

### Viewing the Component Library

It is available at [http://hmrc.github.io/assets-frontend](http://hmrc.github.io/assets-frontend).

If you're running assets-frontend locally using `./server dev` or `npm start`, then you can view the Component Library by opening a browser at http://localhost:9032/component-library/

### Running Component Library with watch

The Component Library will be compiled when you run the following command, this command also adds a watch task so any
changes you make within assets will automatically re-build the component library.

```
$ ./server.sh dev
```

### Manually building the Component Library

A static build of the Component Library can be generated as a single process by running

```
$ npm run comp-lib
```

Bare in mind that in order to see the output in a browser you'll have to serve the files manually from the `component-library` directory with something like [http-server](https://www.npmjs.com/package/http-server) (for node.js) or [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html) (for python)


### Working on the Component Library

The steps for working with a local copy of the component library template are:

1. Remove the npm installed dependancy
2. Clone the [hmrc/component-library-template](https://github.com/hmrc/component-library-template/)
3. Symlink the local template for npm
4. Run the watch task in assets-frontend

Assuming you're in the root of your local assets-frontend it would look like this:

```
$ rm -rf node_modules/hmrc-component-library-template
$ cd .. && git clone https://github.com/hmrc/component-library-template.git
$ cd component-library-template && npm link
$ cd ../assets-frontend
$ npm run comp-lib:watch -- -w ../component-library-template
```

If you're working extensively on the [templates](https://github.com/hmrc/component-library-template) for the Component Library, there is a helpful watch task using [nodemon](https://github.com/remy/nodemon). This makes development easier and faster.

You need to of linked your local version of the component library template
```
$ cd component-library-template && npm link && cd -
```

Assuming you're in the root of your local assets-frontend it would look like this:
```
$ npm install -g nodemon
$ npm run comp-lib:watch -- -w ./path/to/hmrc/component-library-template
```

You need to give it the path to a local checkout of [hmrc-component-library-template](https://github.com/hmrc/component-library-template/), relative to the assets-frontend's `package.json`

The watch task then automatically links this local copy [hmrc/component-library-template](https://github.com/hmrc/component-library-template.git) and then builds the Component Library using the [npm script above](#manually-building-the-component-library).


### Updating the Component Library dependency
If you wish to update the component library in assets frontend because there have been changes in the component
library.

```
$ rm -rf node_modules/hmrc-component-library-template
$ npm install hmrc/component-library-template
```

or

```
$ npm install --force hmrc/component-library-template
```


## Contributing

Please take a few minutes to review the process and guidelines before you submit your request, otherwise it may be rejected.
[CONTRIBUTING.md](CONTRIBUTING.md)


## More info

Check out [the wiki](https://github.com/hmrc/assets-frontend/wiki)


## License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
