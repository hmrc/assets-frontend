# Contribution Guidelines for assets-frontend

Hello! Thank you for taking the time to contribute to the [HMRC Multichannel Digital Tax Platform](https://hmrc.github.io) (MDTP)

We welcome contributions to assets-frontend. By following these guidelines, you will greatly reduce the amount of feedback (and therefore time) between opening your Pull Request and us merging it.

## How to Help?

We’re always looking for feedback, and help is always welcome. These are the areas where you can help:

* Bug fixes and improvements
* Proposing new features
* More tests and better coverage
* Documentation

## Communication

**Before** starting on a piece of work, **please get in touch**. 

We may already have what you’re planning to do on our backlog, or already be working on it.

Communicating early can also help with design decisions and direction for your approach, increasing the chance of us accepting your work.

* [Raise an issue](https://github.com/hmrc/assets-frontend/issues/new)
* [Slack channel for getting in touch with frontend developers](https://hmrcdigital.slack.com/archives/community-frontend)

## Contributing code

Please follow these contribution guidelines to maintain the quality of the code:

**Before a Pull Request**

* Follow style guides
	* [Use EditorConfig](#use-editorconfig)
	* [Lint the code](#lint-the-code)
* [Write tests](#tests)
* [Write documentation](#documentation)
* [Write good commit messages](#commit-messages)
* [Squash related commits before a PR merge](#squash-related-commits)
* [Don't bump the `package.json` version](#versioning)

**Opening a Pull Request**

* [Follow the Pull Request template](#description)
* [Find and link to issues](#closing-issues)
* [Once merged, we'll cut the release](#releasing)

## Code Style Guide

> “All code in any code-base should look like a single person typed it, no matter how many people contributed.” – [Rick Waldron](https://github.com/rwaldron/idiomatic.js/#all-code-in-any-code-base-should-look-like-a-single-person-typed-it-no-matter-how-many-people-contributed)

### Use EditorConfig

The project uses [EditorConfig](http://editorconfig.org) to ensure consistent coding styles between different editors and IDEs. Please [install a plugin](http://editorconfig.org/#download) for your editor of choice or manually enforce the rules listed in [.editorconfig](https://github.com/hmrc/assets-frontend/blob/master/.editorconfig).

### Lint the Code

The project follows [JavaScript Standard Style](http://standardjs.com).

When running locally, all code is linted automatically every time a file is saved. Just run:

```
npm start
```

To lint the code as a standalone task, run:

```
npm run lint
```

## Tests

### Unit Tests

Once you’ve made your changes, run the JavaScript tests to make sure they pass:

[Details on running the JavaScript tests](https://github.com/hmrc/assets-frontend#running-js-tests)

If there aren’t any existing tests that cover your changes, write some new tests.

### Visual Regression Tests

Make sure that your work hasn’t changed anything visually without you knowing, run the visual regression tests:

[Details on running the visual regression tests](https://github.com/hmrc/assets-frontend#visual-regression-testing)

#### A note on browser support

“Your service must be universally accessible. This means building it to work on every browser or device that your users access it on.”

[Details on GOV.UK Browser support]
(https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices)

## Documentation

### Component Library

The project’s files are documented using [kss-node](http://kss-node.github.io/kss-node/).

[Details on generating and viewing the documentation](https://github.com/hmrc/assets-frontend#component-library)

If you’ve added a new component, then document it following our [documentation guidelines](https://github.com/hmrc/assets-frontend/wiki/Component-Library#addingdocumenting-a-component)

### CHANGELOG

The project follows the guidelines laid out in [keepachangelog.com](http://keepachangelog.com/)

## Commits

### Commit messages

Writing good commit messages is important. Not just for other developers on your project, for also for your future self.

There has already been a lot written about git commit messages, so we follow [the same standards as GOV.UK](https://github.com/alphagov/styleguides/blob/master/git.md)

**Recommended reading on this topic**

* [5 useful tips for a better commit message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)
* [Every line of code is always documented](http://mislav.uniqpath.com/2014/02/hidden-documentation/)

### Squash related commits

> ...changes are proposed in a *branch*, which ensures that the `master` branch only contains finished and approved work. – [GitHub](https://help.github.com/articles/creating-a-pull-request/)

Pull requests that do one thing have much more chance of being reviewed and merged quickly. Huge changes that take a long time to work through will have less chance of being reviewed or merged.

**Recommended reading on this topic**

* [One Commit. One change](https://medium.com/@fagnerbrack/one-commit-one-change-3d10b10cebbf#.im4vlnj3i)
* [One Pull Request. One Concern](https://medium.com/@fagnerbrack/one-pull-request-one-concern-e84a27dfe9f1#.uz7cmt50g)

## Pull Requests

### Description

When filling out the description for your Pull Request, [follow the template](https://github.com/hmrc/assets-frontend/blob/master/.github/PULL_REQUEST_TEMPLATE.md).

### Closing issues

Search for **all** issues relating to your work that may have been raised prior to your pull request and [link to them](https://github.com/blog/957-introducing-issue-mentions) so we can keep our issue backlog tidy.

If your pull request *closes* an issue then follow [this guide on GitHub](https://help.github.com/articles/closing-issues-via-commit-messages/)

### Versioning

Our internal build and release tooling is responsible for bumping the versions of the project.

### Releasing

Once the pull request has been merged, it is the joint responsibility of the Contributor and the Owning Team to:

* Discuss the optimal timing of pre-production and production releases
* Validate the functional and operational impact once the release reaches pre-production and production

It's the responsibility of the Owning Team alone to deploy/schedule the release into the relevant pre-production and production environment(s).

## Frontend Principles

Work should be added in a modular fashion and code that only serves the purpose of a single service should be avoided. Be generic and compliment the shared library.

### Progressive Enhancement

All work on GOV.UK should be [built in a progressive fashion](https://www.gov.uk/service-manual/technology/using-progressive-enhancement).

**Recommended reading on this topic**

* [Resilient Web Design](https://resilientwebdesign.com/)

### Accessibility

Services on GOV.UK are for the benefit of all UK citizens. This means you must build a service that’s as inclusive as possible.

[Accessibility guidance on GOV.UK](https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction)
