# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
- Depricated the HMRC character counter in favour of the GDS version [#897](https://github.com/hmrc/assets-frontend/pull/879)

### Fixed
- Allows assets-frontend to run in a Windows environment [#878](https://github.com/hmrc/assets-frontend/pull/878)

### Fixed
- Fix style for logged in status logo [#872](https://github.com/hmrc/assets-frontend/pull/872)
- Fix header logo reference in header and account-header components [#874](https://github.com/hmrc/assets-frontend/pull/874)
- Move header component stylesheet import to all-components [#875](https://github.com/hmrc/assets-frontend/pull/875)
- Include JavaScript from GOV.UK frontend toolkit [#880](https://github.com/hmrc/assets-frontend/pull/880)

## [3.0.1]
- Remove the `.content__body p` selector as it is too specific and overriding other changes in V3
- Remove changes that had previously been put in place to add specificity to other classes to counteract the effect of `.content__body p`

### Fixed
- fixed comments on shutter page examples [#870](https://github.com/hmrc/assets-frontend/pull/870)

### Changed
- added work in progress banner to the character counter [#869](https://github.com/hmrc/assets-frontend/pull/869)

## [3.0.0] - 2017-11-24

:rotating_light: **BREAKING CHANGE!!!** :rotating_light:

This entire version is covered by a single pull request. [#867](https://github.com/hmrc/assets-frontend/pull/867)

### Added
- GOV.UK dependencies from npm :tada:
- Backward compatibility overrides for component library styles
- External link images moved to `/assets/images` for backward compatibility
- `govuk-mixins` file for backward compatibility

### Changed
- Buttons are now full width on mobile
- Text inputs are full width on mobile and half width on desktop
- Text inputs have darker border colour
- Margin on headings is coming from GOV.UK elements
- Updated image paths
- `govuk-template.js` moved to vendor directory
- Root scss files have been moved and simplified


### Deprecated
- The Component Library!
- All styles in `/assets/scss`

### Removed
- Embedded GOV.UK dependency directories
- Unnecessary `govuk-elements` update script

## [2.254.0] - 2017-11-23
## Added
- Adds a close link to the banner, with cookie [#859](https://github.com/hmrc/assets-frontend/pull/859)
- Added the account header [#862](https://github.com/hmrc/assets-frontend/pull/862)
- Updated reportAProblem to reattach form validation after a successful submission, in case of server side validation failure resulting in the form reloaded [#863](https://github.com/hmrc/assets-frontend/pull/863/files)
- removed the account menu component from the navigation [#865](https://github.com/hmrc/assets-frontend/pull/865)

### Changed
- Changed a reference to an svg icon to a data uri [#848](https://github.com/hmrc/assets-frontend/pull/848)
- Updated .nvmrc file to use up to date node version for AF [#848](https://github.com/hmrc/assets-frontend/pull/848)
- Remove style overrides for layout and typography for the Design System [#851](https://github.com/hmrc/assets-frontend/pull/851)
- Add Styles tab with a reference for Component Library [#858](https://github.com/hmrc/assets-frontend/pull/858)
- Resolve navigation snag list for Frontend-template [#861](https://github.com/hmrc/assets-frontend/pull/861)
- Add Styles to fix singleCheckbox error message placement [#864](https://github.com/hmrc/assets-frontend/pull/864)

## Fixed
- Updated reportAProblem to reattach form validation after a successful submission, in case of server side validation failure resulting in the form reloaded [#863](https://github.com/hmrc/assets-frontend/pull/863/files)

## [2.253.0] - 2017-10-26
### Added
- 404 page pattern [#835](https://github.com/hmrc/assets-frontend/pull/835)
- Shutter Page pattern [#838](https://github.com/hmrc/assets-frontend/pull/838)
- 500 Pages [#842](https://github.com/hmrc/assets-frontend/pull/842)
- Added the image `icon-print.svg` [#841](https://github.com/hmrc/assets-frontend/pull/841)
- Add WIP macro [#843](https://github.com/hmrc/assets-frontend/pull/843)

### Changed
- Replace the component library with a new design pattern library [#822](https://github.com/hmrc/assets-frontend/pull/822)
- Add header component to the new design system  [#829](https://github.com/hmrc/assets-frontend/pull/829)
- Use macros for example and markup rendering in README.md [#828](https://github.com/hmrc/assets-frontend/pull/828)
- Modify CHANGELOG.md change verification to stabilise Travis CI [#833](https://github.com/hmrc/assets-frontend/pull/833)
- Allow README.md only changes to be merged without forcing CHANGELOG.md to be changed [#836](https://github.com/hmrc/assets-frontend/pull/836)
- Replaced [\_panels.scss](https://github.com/hmrc/assets-frontend/pull/835/commits/31e4c36c1a94e151448b23b34670fff7232d7823) with content from GOV.UK [#835](https://github.com/hmrc/assets-frontend/pull/835)
- Updated the homepage with a description of patterns [#846](https://github.com/hmrc/assets-frontend/pull/846)

## [2.252.0] - 2017-10-16
### Changed
- Minor updates to input type="number" and fix for Firefox [#821](https://github.com/hmrc/assets-frontend/pull/821)
- Updating `.notice-banner__content` styles so that they're actually visible [#820](https://github.com/hmrc/assets-frontend/pull/820)

### Fixed
- Updated validatorFocus javascript to navigate to the input field in IE8 when there is a valudation error. [#805](https://github.com/hmrc/assets-frontend/pull/805)

### Added
- Styling for new full width banner on frontend-template-provider [#824](https://github.com/hmrc/assets-frontend/pull/824)
- Introduced new summary page styling, derived from GOV.UK design pattern. New sass partial `_check-your-answers.scss` [#823](https://github.com/hmrc/assets-frontend/pull/823)

## [2.251.1] - 2017-10-05
### Changed
- Updating .form-control styles missed in 2.251.0 [#816](https://github.com/hmrc/assets-frontend/pull/816)

## [2.251.0] - 2017-10-04
### Added
- Updated visually hidden mixin to align with GDS [#814](https://github.com/hmrc/assets-frontend/pull/814)

### Changed
- Increased border with for form control and updated border colour and padding [#812](https://github.com/hmrc/assets-frontend/pull/812)
- Updated padding for button mixin and included outline css [#813](https://github.com/hmrc/assets-frontend/pull/813)

## [2.250.0] - 2017-09-29
### Added
- Added new account menu for use across services [#810](https://github.com/hmrc/assets-frontend/pull/810)
- Adds an updated page heading pattern [#809](https://github.com/hmrc/assets-frontend/pull/809)

## [2.249.0] - 2017-09-18
### Changed
- Updated existing link colour variables to match gov.uk [#795](https://github.com/hmrc/assets-frontend/pull/795)

### Fixed
- Increased font size in transaction banner headers to match the GDS example banner to fix an accessibility issue [#781](https://github.com/hmrc/assets-frontend/pull/781)

## [2.248.1] - 2017-09-04
### Fixed
- Production styles not being generated on CI [#804](https://github.com/hmrc/assets-frontend/pull/804)

## [2.248.0] - 2017-08-23
### Added
- Generate component library files from components in new file structure without kss-node [#791](https://github.com/hmrc/assets-frontend/pull/791)
- Fixes builds silently failing [#798](https://github.com/hmrc/assets-frontend/pull/798)
- Optional quiet logging for VRT tests using --quiet flag [#798](https://github.com/hmrc/assets-frontend/pull/800)
- Styles to update back link to latest version [#801](https://github.com/hmrc/assets-frontend/pull/801)

### Changed
- Updated the README.md as node version has been bumped up
- Updated most build-related dependencies to latest versions & refactor gulp tasks to be more efficient [#787](https://github.com/hmrc/assets-frontend/pull/787)

### Fixed
- Tests pass when run against nodejs 4.8.4 and 6.11.1 [#788](https://github.com/hmrc/assets-frontend/pull/788)

## [2.247.0] - 2017-08-01
### Added
- Add latest GOV.UK radio buttons and checkboxes [#789](https://github.com/hmrc/assets-frontend/pull/789)

### Fixed
- Tests pass when run against nodejs 4.8.4 [#784](https://github.com/hmrc/assets-frontend/pull/784)

## [2.246.0] - 2017-07-20
### Fixed
- Ignore the arrow test from modernizr as it was setting the page width to 12px [#783](https://github.com/hmrc/assets-frontend/pull/783)

### Changed
- Added the correct class to the Tab component to enable targetting an open tab via the url with a fragment [#778](https://github.com/hmrc/assets-frontend/issues/778)

## [2.245.0] - 2017-05-09
### Fixed
- Updated the README with the supported Node version [#775](https://github.com/hmrc/assets-frontend/pull/775)
- Added explicit colour (white) to transaction banner headers to match the GDS example banner [#776](https://github.com/hmrc/assets-frontend/pull/776)

## [2.242.2] - 2017-04-21
## [2.242.1] - 2017-04-20
### Fixed
- Pass the change log check if no files have been changed (mostly for CI) [#771](https://github.com/hmrc/assets-frontend/pull/771)

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
- The [Character counter](http://hmrc.github.io/assets-frontend/section-textarea-input.html#kssref-textarea-input-counter) has been refactored into our new clearer file structure [#767](https://github.com/hmrc/assets-frontend/pull/767)

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

[Unreleased]: https://github.com/hmrc/assets-frontend/compare/release/3.0.0...master
[3.0.0]: https://github.com/hmrc/assets-frontend/compare/release/2.254.0...release/3.0.0
[2.254.0]: https://github.com/hmrc/assets-frontend/compare/release/2.253.0...release/2.254.0
[2.253.0]: https://github.com/hmrc/assets-frontend/compare/release/2.252.0...release/2.253.0
[2.252.0]: https://github.com/hmrc/assets-frontend/compare/release/2.251.1...release/2.252.0
[2.251.1]: https://github.com/hmrc/assets-frontend/compare/release/2.251.0...release/2.251.1
[2.251.0]: https://github.com/hmrc/assets-frontend/compare/release/2.250.0...release/2.251.0
[2.250.0]: https://github.com/hmrc/assets-frontend/compare/release/2.249.0...release/2.250.0
[2.249.0]: https://github.com/hmrc/assets-frontend/compare/release/2.248.1...release/2.249.0
[2.248.1]: https://github.com/hmrc/assets-frontend/compare/release/2.248.0...release/2.248.1
[2.248.0]: https://github.com/hmrc/assets-frontend/compare/release/2.247.0...release/2.248.0
[2.247.0]: https://github.com/hmrc/assets-frontend/compare/release/2.246.0...release/2.247.0
[2.246.0]: https://github.com/hmrc/assets-frontend/compare/release/2.245.0...release/2.246.0
[2.245.0]: https://github.com/hmrc/assets-frontend/compare/release/2.242.2...release/2.245.0
[2.242.2]: https://github.com/hmrc/assets-frontend/compare/release/2.242.1...release/2.242.2
[2.242.1]: https://github.com/hmrc/assets-frontend/compare/release/2.242.0...release/2.242.1
[2.242.0]: https://github.com/hmrc/assets-frontend/compare/release/2.241.0...release/2.242.0
[2.241.0]: https://github.com/hmrc/assets-frontend/compare/release/2.240.0...release/2.241.0
[2.240.0]: https://github.com/hmrc/assets-frontend/compare/release/2.239.0...release/2.240.0
[2.239.0]: https://github.com/hmrc/assets-frontend/compare/release/2.238.0...release/2.239.0
