frontend-assets
===============

Front end assets for the Tax platform

##Getting Started

To start serving assets on a local server, you have the option to run with Node.js or a simple Python server.

###Running with Grunt (Development mode)

To start the grunt task runner:
	./server dev


###Running with Python

To serve static assets use the commend below:

	./server
Please note that this will only run the precompiled (production-ready) assets


###Running Frontend Tests

The [grunt Karma test runner](https://github.com/karma-runner/grunt-karma) is used to run our frontend tests with the command:

	./server test

###Running the Frontend build

	./server build
Compiles our assets for production.

###Dependancies
[GOVUK Frontend Toolkit](https://github.com/alphagov/govuk_frontend_toolkit) pulled in using the Subtree merge strategy.
