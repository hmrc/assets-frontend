# assets-frontend

This repository contains the source files and documentation for the Components & Design Patterns used to design and build digital services for the HMRC Tax Platform.

It provides additional styles on top of the [GOV.UK styles](govuk-elements).


# Quick Start

## Requirements

* [Node.js](https://nodejs.org/en/) `== 4.8.4`
* [npm](https://www.npmjs.com/) `>= 2.11.3`

To install multiple versions of Node.js, you may find it easier to use a node version manager:

* [nvm](https://github.com/creationix/nvm)
* [n](https://github.com/tj/n)

## Installation

Clone this repository and install its dependencies:

```
$ git clone https://github.com/hmrc/assets-frontend.git
$ cd assets-frontend
$ npm install
```

## Running

### The Design System:

1. Run `npm start`
2. The Design System is available at http://localhost:9034/

### The Component Library [DEPRECATED]

1. Run `npm run build:all`
2. The Component Library is available at http://localhost:9033/

### Assets Frontend locally

1. Run `./server.sh`
2. V4 Assets are then available at http://localhost:9032/assets/4.11.0/...
3. V3 Assets are then available at http://localhost:9032/assets/3.11.0/...

# Usage

## Using assets locally

### Prototypes

For now, the quickest and simplest way to add assets-frontend to your prototype is to grab the built CSS and JS from production.

Just replace `<VERSION>` in the links below with the [released version](https://github.com/hmrc/assets-frontend/releases) you want to use (we recommend using the latest).

If your prototype is based on the [GOV.UK prototype kit](https://github.com/alphagov/govuk_prototype_kit/) then do the following:

**CSS**

Save the file found at
[https://www.tax.service.gov.uk/assets/\<VERSION\>/stylesheets/application.min.css](https://www.tax.service.gov.uk/assets/\<VERSION\>/stylesheets/application.min.css)
to `/app/assets/sass/assets-frontend.css`.

And add the following to `app/views/includes/head.html`:
```
<link href="/public/stylesheets/assets-frontend.css" rel="stylesheet" type="text/css" />
```

**JavaScript**

Save the file found at
[https://www.tax.service.gov.uk/assets/\<VERSION\>/javascripts/application.min.js](https://www.tax.service.gov.uk/assets/\<VERSION\>/javascripts/application.min.js)
to `/app/assets/javascripts/assets-frontend.js`

And add the following to `app/views/includes/head.html`
```
<script src="/public/javascripts/assets-frontend.js"></script>
```

## Frontends

If your frontend is based on [init-service](https://github.com/hmrc/init-service/), then you just need to make sure the configuration for assets in the [application.conf](https://github.com/hmrc/init-service/blob/f9a55c100faa8b13d2a1a869c0531f6e3a7b556c/templates/service/conf/application.conf#L73-L77) file has the line `version = ${?ASSETS_FRONTEND_VERSION}` after declaring the actual version.

Once it has, you just need to set an environment variable before running your frontend:

```
$ ASSETS_FRONTEND_VERSION=999-SNAPSHOT sbt run
```

If you’re using [service-manager](https://github.com/hmrc/service-manager), please read the [service manager guidance in the Wiki](https://github.com/hmrc/assets-frontend/wiki/Using-service-manager).


## Using assets in production

Running `npm run release` calls the [release gulp task](https://github.com/hmrc/assets-frontend/blob/master/gulpfile.js/tasks/release.js) and this happens on our internal Jenkins instances.

The final step of our internal release pipeline is to version and deploy the compiled assets to https://www.tax.service.gov.uk/assets/.

Releasing assets for use in production is currently a process owned by the [Service Design Tools](https://github.com/orgs/hmrc/teams/service-design-tools) team.

If you’d like a new version of assets-frontend released, please get in touch with us in the [#team-sdt](https://hmrcdigital.slack.com/messages/C39V3PH38) Slack channel.


# HMRC Design System

The [HMRC Design System can be viewed here](http://hmrc.github.io/assets-frontend/).

For detailed information on how the HMRC Design System works, please read the [Design System page in the Wiki](https://github.com/hmrc/assets-frontend/wiki/HMRC-Design-System).


# Component Library - [DEPRECATED]

:rotating_light: **The Component Library has been deprecated in favour of the [HMRC Design System](http://hmrc.github.io/assets-frontend/).**:rotating_light:

If your service relies on a component or pattern that doesn’t appear in the HMRC Design System then please follow the [Design System contribution guidelines](https://github.com/hmrc/assets-frontend/wiki/HMRC-Design-System#contributing-a-design-pattern).

For detailed information on how the Component Library works, please read the [Component Library guidance in the Wiki](https://github.com/hmrc/assets-frontend/wiki/Component-Library-%5BDEPRECATED%5D).


# Contributing

## Design Patterns

For details on how to contribute Design Patterns, please take a few minutes to review our [Design Pattern standards and contribution process](https://github.com/hmrc/assets-frontend/wiki/HMRC-Design-System#contributing-a-design-pattern) before you submit your request, otherwise it may be rejected.

## Features and issues

If you’ve spotted an issue or thought of a feature that you’d like to contribute to assets-frontend, please take a few minutes to review our [contribution process and guidelines for Assets Frontend](CONTRIBUTING.md) before you submit your request, otherwise it may be rejected.


# License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
