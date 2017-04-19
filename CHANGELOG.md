# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Fixed
- Change log check passes if no files have been changed (mostly for CI) [#771](https://github.com/hmrc/assets-frontend/pull/771)

## [2.242.0] - 2017-04-13
### Added
- This change log! :boom: [#753](https://github.com/hmrc/assets-frontend/pull/753)
- ...and a check that it's been update as part of a pull request [#759](https://github.com/hmrc/assets-frontend/pull/759)
- [standardjs](http://standardjs.com) formatting for JavaScript [#736](https://github.com/hmrc/assets-frontend/pull/736)
- Interaction for visual regression tests [#748](https://github.com/hmrc/assets-frontend/pull/748)
- Gulpfile JavaScript tests (using [tape](https://www.npmjs.com/package/tape)) [#756](https://github.com/hmrc/assets-frontend/pull/756)

### Changed
- Removed email address from apiCollaboratorResponse ajax form action url [#768](https://github.com/hmrc/assets-frontend/pull/768)
- Simplified the contributing guidelines [#752](https://github.com/hmrc/assets-frontend/pull/752)
- Added `bundle-collapser` plugin to convert bundle paths to IDs in bundled JavaScript [#763](https://github.com/hmrc/assets-frontend/pull/763)

### Fixed
- Continuous Integration builds weren't failing when JavaScript acceptance tests failed [#754](https://github.com/hmrc/assets-frontend/pull/754)
- The Youtube-player Visual regression test was always failing [#761](https://github.com/hmrc/assets-frontend/pull/761)
- Changelog test class, lint errors [#764](https://github.com/hmrc/assets-frontend/pull/764)
- Fixed jenkins builds failing changelog check [#769](https://github.com/hmrc/assets-frontend/pull/769)

## [2.241.0] - 2017-01-20
### Fixed
- URLs for `govuk_template` assets in nginx error pages [#735]

## [2.240.0] - 2017-01-16
## [2.239.0] - 2017-01-13
### Fixed
- Changes to nginx error pages not being build and deployed [#734]

[Unreleased]: https://github.com/hmrc/assets-frontend/compare/release/2.242.0...master
[2.242.0]: https://github.com/hmrc/assets-frontend/compare/release/2.241.0...release/2.242.0
[2.241.0]: https://github.com/hmrc/assets-frontend/compare/release/2.240.0...release/2.241.0
[2.240.0]: https://github.com/hmrc/assets-frontend/compare/release/2.239.0...release/2.240.0
[2.239.0]: https://github.com/hmrc/assets-frontend/compare/release/2.238.0...release/2.239.0
