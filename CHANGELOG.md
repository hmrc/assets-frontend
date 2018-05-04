# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Fixed
- Added the `mailto:` scheme to the email link on the design-system *About* page. [951](https://github.com/hmrc/assets-frontend/pull/951)
### Changed
- Moved the header pattern to patterns and updated documentation [944](https://github.com/hmrc/assets-frontend/pull/944)
- `node-git-versioning` plugin has been published to npm so we can depend on that version [#946](https://github.com/hmrc/assets-frontend/pull/946)

### Changed
- The secondary timeout dialog button should be a link

### Updated
- Timeout documentation and examples [#949](https://github.com/hmrc/assets-frontend/pull/949)
- Page not found, service unavailable and there is a problem with the service examples [#947](https://github.com/hmrc/assets-frontend/pull/947)

### Added
- New patterns for help users when we cannot confirm who they are and tell user we have confirmed who they are [#942](https://github.com/hmrc/assets-frontend/pull/942)

## [3.2.4] and [4.2.4] - 2018-04-12
### Fixed
- The text in form inputs wasn't visible in high contrast mode [#939](https://github.com/hmrc/assets-frontend/pull/939)
- Run tests in desktop viewport instead of phantom's default 400 [#927](https://github.com/hmrc/assets-frontend/pull/927)
- Fixed broken link on "errors and validation" styles page [#937](https://github.com/hmrc/assets-frontend/pull/937)

### Updated
- Documentation and examples for page not found, service unavailable and there is a problem with the service [#936](https://github.com/hmrc/assets-frontend/pull/936)
- Updated notification badge CSS, code and examples [#934](https://github.com/hmrc/assets-frontend/pull/934)
- Fixed a typo in open links in a new window or tab page [#935](https://github.com/hmrc/assets-frontend/pull/935)
- Fixed a typo in technical problem page [#933](https://github.com/hmrc/assets-frontend/pull/933)
- Added documentation for page title [#928](https://github.com/hmrc/assets-frontend/pull/928)
- Added documentation for open links in a new window or tab component [#926](https://github.com/hmrc/assets-frontend/pull/926)
- Updated documentation headings and page not found pattern [#922](https://github.com/hmrc/assets-frontend/pull/922)
- Updated documentation and examples for page heading [#923](https://github.com/hmrc/assets-frontend/pull/923)
- Refactoring the account menu JS and adding in unit tests [#929](https://github.com/hmrc/assets-frontend/pull/929)
- Running the patterns tests alongside components tests [#948](https://github.com/hmrc/assets-frontend/pull/948)

### Changed
- Version build artefacts according to the [HMRC release candidate format](http://hmrc.github.io/coding-in-the-open-manual/#release-candidates) [#924](https://github.com/hmrc/assets-frontend/pull/924)
- Tar build artefacts instead of zip and add a package file for publishing [#925](https://github.com/hmrc/assets-frontend/pull/925)
- Moved the timeout dialog pattern from the components directory to the patterns directory [#931](https://github.com/hmrc/assets-frontend/pull/931)

## [3.2.3] and [4.2.3] - 2018-03-15
### Fixed
- Preventing a user from being able to focus inside the subnav when it has not been opened [#920](https://github.com/hmrc/assets-frontend/pull/920)

## [3.2.2] and [4.2.2] - 2018-02-16
### Fixed
- Ability to use universal analytics with stageprompt [#914](https://github.com/hmrc/assets-frontend/pull/914)
- IE8 support in the minified JavaScript [#916](https://github.com/hmrc/assets-frontend/pull/916)

### Updated
- Updated documentation for service unavailable and technical problem pages, and changed work in progress and deprecated banner styles [#912](https://github.com/hmrc/assets-frontend/pull/912)

## [3.2.1] and [4.2.1] - 2018-02-02
### Fixed
- SDT-768 [#908](https://github.com/hmrc/assets-frontend/issues/908) Updated the generated markup for buttons so that they better represent how to use the new govuk-elements css
- Issue with Stageprompt not recognising JQuery [909](https://github.com/hmrc/assets-frontend/pull/909)

## [3.2.0] and [4.2.0] - 2018-01-25
### Fixed
- Build styles as a dependency of the test task [896](https://github.com/hmrc/assets-frontend/issues/896)
- Link style button(button--link) focus background colour is green [900](https://github.com/hmrc/assets-frontend/issues/900)
- Change log checks that the current commit doesn't exist in the remote master [904](https://github.com/hmrc/assets-frontend/pull/904)

### Added
- Added in links to the contribution guidelines [#902](https://github.com/hmrc/assets-frontend/pull/902)

### Changed
- Improve the developer experience of running assets-frontend [735](https://github.com/hmrc/assets-frontend/pull/907)

## [3.1.0] and [4.1.0] - 2018-01-16
### Added
- Build a version without deprecated components [#873](https://github.com/hmrc/assets-frontend/pull/873)
- All style sections now link to the corresponding GOV.UK Elements style section [#883](https://github.com/hmrc/assets-frontend/pull/883)
- Session Timeout Modal [#889](https://github.com/hmrc/assets-frontend/pull/889)
- New badge component [#886](https://github.com/hmrc/assets-frontend/pull/886)

### Fixed
- Calls `.restore()` on spied functions after they've been used to prevent `already wrapped` errors from crashing the `watch` task [#882](https://github.com/hmrc/assets-frontend/pull/882)
- Nunjucks config needed path to components - [892](https://github.com/hmrc/assets-frontend/issues/891)

### Changed
- Updated badge README.md and added second markup example [#895](https://github.com/hmrc/assets-frontend/issues/895)
- Updated the ‘pattern-library’ task so macro refs are dynamic in the gulp task [#890](https://github.com/hmrc/assets-frontend/pull/890)
- Content of work in progress macro and added new research macro [#888](https://github.com/hmrc/assets-frontend/pull/888)
- Include language selector as a partial in other components [#887](https://github.com/hmrc/assets-frontend/pull/887)
- Removed check your answers from component navigation [#885](https://github.com/hmrc/assets-frontend/pull/885)
- Fix issue with blue border not displaying on pages without the PTA account menu [#903](https://github.com/hmrc/assets-frontend/pull/903)

## [3.0.2] - 2017-12-19
### Deprecated
- Deprecated the HMRC character counter in favour of the GDS version [#897](https://github.com/hmrc/assets-frontend/pull/879)

### Fixed
- Allows assets-frontend to run in a Windows environment [#878](https://github.com/hmrc/assets-frontend/pull/878)
- Fix style for logged in status logo [#872](https://github.com/hmrc/assets-frontend/pull/872)
- Fix header logo reference in header and account-header components [#874](https://github.com/hmrc/assets-frontend/pull/874)
- Move header component stylesheet import to all-components [#875](https://github.com/hmrc/assets-frontend/pull/875)
- Include JavaScript from GOV.UK frontend toolkit [#880](https://github.com/hmrc/assets-frontend/pull/880)

## [3.0.1] - 2017-11-30
### Removed
- Remove the `.content__body p` selector as it is too specific and overriding other changes in V3
- Remove changes that had previously been put in place to add specificity to other classes to counteract the effect of `.content__body p`

### Fixed
- Remove the `.content__body p` selector as it is too specific and overriding other changes in V3
- Remove changes that had previously been put in place to add specificity to other classes to counteract the effect of `.content__body p`
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

[Unreleased]: https://github.com/hmrc/assets-frontend/compare/release/4.2.0...master
[4.2.4]: https://github.com/hmrc/assets-frontend/compare/release/4.2.3...release/4.2.4
[4.2.3]: https://github.com/hmrc/assets-frontend/compare/release/4.2.2...release/4.2.3
[4.2.2]: https://github.com/hmrc/assets-frontend/compare/release/4.2.1...release/4.2.2
[4.2.1]: https://github.com/hmrc/assets-frontend/compare/release/4.2.0...release/4.2.1
[4.2.0]: https://github.com/hmrc/assets-frontend/compare/release/4.1.0...release/4.2.0
[4.1.0]: https://github.com/hmrc/assets-frontend/compare/release/3.0.2...release/4.1.0
[3.2.4]: https://github.com/hmrc/assets-frontend/compare/release/3.2.4...release/3.2.4
[3.2.3]: https://github.com/hmrc/assets-frontend/compare/release/3.2.2...release/3.2.3
[3.2.2]: https://github.com/hmrc/assets-frontend/compare/release/3.2.1...release/3.2.2
[3.2.1]: https://github.com/hmrc/assets-frontend/compare/release/3.2.0...release/3.2.1
[3.2.0]: https://github.com/hmrc/assets-frontend/compare/release/3.1.0...release/3.2.0
[3.1.0]: https://github.com/hmrc/assets-frontend/compare/release/3.0.2...release/3.1.0
[3.0.2]: https://github.com/hmrc/assets-frontend/compare/release/3.0.1...release/3.0.2
[3.0.1]: https://github.com/hmrc/assets-frontend/compare/release/3.0.0...release/3.0.1
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
