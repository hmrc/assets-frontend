# assets-frontend

Frontend assets for the Tax platform

[![Stories in Ready](https://badge.waffle.io/hmrc/assets-frontend.png?label=ready&title=Ready)](https://waffle.io/hmrc/assets-frontend) [![Build Status](https://travis-ci.org/hmrc/assets-frontend.svg?branch=master)](https://travis-ci.org/hmrc/assets-frontend) [![devDependency Status](https://david-dm.org/hmrc/assets-frontend/dev-status.svg)](https://david-dm.org/hmrc/assets-frontend#info=devDependencies)


- [Using service-manager](#using-service-manager)
- [Requirements](#requirements)
- [Running Locally](#running-locally)
- [Running JS Tests](#running-js-tests)
- [Running tests whilst developing](#running-js-tests-whilst-developing)
- [Running a Production build](#running-a-production-build)
- [Component Library](#component-library)
- [Contributing](#contributing)
- [More info](#more-info)
- [License](#license)


<a name="using-service-manager">
## Using service-manager

Unless you're making changes to the frontend assets, you'll most likely be using [service-manager](https://github.com/hmrc/service-manager) to serve assets to your frontends. The ASSETS_FRONTEND service is responsible for serving released artifacts and can be started with:

```
$ sm --start ASSETS_FRONTEND
```


## Developing Locally

<a name="requirements">
### Requirements

* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [nodemon](https://github.com/remy/nodemon)

### node.js
### [node.js](https://nodejs.org/en/) & [npm](https://www.npmjs.com/)
Please install node.js and npm. 
You may find it easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

### nodemon
It is recommended to install nodemon globally.
```
$ npm install -g nodemon
```


<a name="running-locally">
### Running Locally (Development mode)

The command below will kick off a local node.js server on a predefined port (9032). This serves the assets with sourcemaps via the gulp task runner.

```
$ ./server.sh dev
```

### Running JS Tests
<a name="running-js-tests">
The [Karma test runner](http://karma-runner.github.io/) is used to run our JS tests with the command:

```
$ ./server.sh test
```

### Running tests whilst developing
<a name="running-js-tests-whilst-developing">
To add an auto watch and run test whilst developing use the command:

```
$ npm run test:dev
```

To run tests and check dependencies use the command:

```
$ ./server.sh test-dev
```

### Running a Production build
<a name="running-a-production-build">
Compiles the assets for production.

```
$ ./server.sh build
```

Compiles the assets for npm. This bumps the version number in `package-build.json`

```
$ ./server.sh build --release=$VERSION_NUMBER
```
(Where `$VERSION_NUMBER` is a string in semver format. i.e. 1.50.0)


## Component Library
<a name="component-library">

### Viewing the Component Library
If you have browserSync running you can see the Component Library locally by going to 
[http://localhost:9032/component-library/](http://localhost:9032/component-library/)

### Running Component Library with watch
The Component Library will be compiled when you run the following command, this command also adds a watch task so any
changes you make within assets will automatically re-build the component library.
```
$ ./server.sh dev
```

### Manually running Component Library
The Component Library can be manually compiled by using the following command.
```
$ npm run comp-lib
```

### Working on Component Library
If you are working on the structure on the Component Library there is a task to add a watch using 
[nodemon](https://github.com/remy/nodemon)
which makes it easier to develop. This will `npm link hmrc-component-library-template` and build the Component Library. 
You need to pass in the location of the folder where your local checkout of the 
[hmrc-component-library-template](https://github.com/hmrc/component-library-template/)
can be found, relative to the assets-frontend's `package.json`
```
$ npm run comp-lib:watch -- -w ./path/to/hmrc/component-library-template
```
**e.g**:
```
$ npm run comp-lib:watch -- -w ./../component-library-template
```


## Contributing
<a name="contributing">
1. Fork this repo
2. Create a feature branch
3. Push to your fork
4. Open a pull request back to this repo


## More info
<a name="more-info">
Check out [the wiki](https://github.com/hmrc/assets-frontend/wiki)


## License
<a name="license">
This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").