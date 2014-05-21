assets-frontend
===============

Front end assets for the Tax platform

##Getting Started

###Development


###Running with Grunt (Development mode)

The command below will kick off a local NodeJs server on a predefined port(9032). This serves the source assets in their unminified form via the grunt task runner.

	./server dev



###Running Frontend Tests

The [grunt Karma test runner](https://github.com/karma-runner/grunt-karma) is used to run our frontend tests with the command:

	./server test

###Running the Frontend build

	./server build
Compiles our assets for production.

###Dependancies
[GOVUK Frontend Toolkit](https://github.com/alphagov/govuk_frontend_toolkit) pulled in using the Subtree merge strategy.

##Using the Application Manager

Unless you're making changes to the frontend assets, you'll most likely be using the application manager to serve assets to your frontends. The ASSETS_FRONTEND service is responsible for serving released artifacts and can be started with the command below.

	./sm.py --start ASSETS_FRONTEND

