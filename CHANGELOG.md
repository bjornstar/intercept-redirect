# Intercept Redirect

## v8.9.0 - 2023-02-17
- Handle all subdomains of `safelinks.protection.outlook.com`
- Improve logic for handling subdomains
- [.appveyor] Use node v18
- [.circleci] Use node `lts` on "next-gen" Docker image
- [.github/workflows] Use node v18
- [.github/workflows] Update actions versions
- [.travis] Remove travis-ci config
- [devDependencies] Update `addons-linter`, `eslint`, and `mocha`

## v8.8.0 - 2022-06-01
- Add `linkedin.com`

## v8.7.0 - 2022-05-04
- Add `facebook.com`
- Add `redirect.epicgames.com`

## v8.6.0 - 2022-01-02
- Add `c212.net`
- Add `cj.dotomi.com`

## v8.5.0 - 2021-12-29
- Add `r.klar.na`

## v8.4.0 - 2021-11-13
- Add `onlyfans.com`
- Add funding information

## v8.3.1 - 2021-11-06
- Fix duplicate entry: 2nd `*://www.google.com/imgres` should have been `*://www.google.se/imgres`
- [Tests] Start using `addons-linter`

## v8.3.0 - 2021-11-06
- Add `www.google.se`
- Only redirect `sorry/index` from `google.com`
- [devDependencies] Update `eslint` & `mocha`
- [`README.md`] Fix a grammatical error

## v8.2.0 - 2021-11-01
- Add `www.google.com/sorry/index`
- [devDependencies] Update `eslint`
- [`.gitignore`] Ignore `package-lock.json`

## v8.1.0 - 2021-10-05
- Add `clickserve.dartsearch.net`

## v8.0.0 - 2021-06-10
- Add `github-redirect.dependabot.com`
- [Tests] Add support for arbitrary expected redirectURLs
- [CI] Only test on node v16

## v7.1.0 - 2021-04-21
- Add support for `t.lever-analytics.com`
- [devDependencies] Update `mocha` & `eslint`

## v7.0.2 - 2021-03-24
- [`.npmignore`] It should be the filename with extension: `.eslintrc.json`

## v7.0.1 - 2021-03-24
- [`README.md`] Add a better description and make the image link to the website
- [`package.json`] npm now deletes empty dependencies
- [`.npmignore`] Publish less extraneous data to npm

## v7.0.0 - 2021-03-03
- Add `https://href.li`
- [Tests] Update tests to use strictEqual instead of equal

## v6.0.0 - 2020-09-18
- Add `https://m.facebook.com/flx/warn/`
- Add `https://www.kraken.com/redirect`
- Add more languages for `javlibrary`
- [`manifest.json`] Make URLs more specific
- [Tests] Use a variable for the encoded URL to avoid copy/paste errors
- [Tests] Use URL to extract the host instead of doing it ourselves
- [devDependencies] Update mocha & eslint

## v5.4.0 - 2020-05-29
- Add a link to the Microsoft Edge version in the `README` (Fixes #23)
- Add `special-google-chrome-web-store-description.txt` to assets
- Redirect to the correct URL on `outgoing.prod.mozaws.net` when slashes are not url encoded (Fixes #22)
- Update devDependency `eslint` from `v7.0.0` to `v7.1.0`
- Update devDependency `mocha` from `v7.1.2` to `v7.2.0`

## v5.3.2 - 2020-05-29
- Use the `icon-300` image from assets for the `README` (Fixes #21)

## v5.3.1 - 2020-05-25
- Add 16px and 48px icons as an attempt to appease the Google Chrome Web Store team

## v5.3.0 - 2020-05-17
- Add support for `lm.facebook.com`

## v5.2.2 - 2020-05-15
- Add a privacy policy: `PRIVACY.md`
- Add a badge for CWS
- Add a 300x300 icon for Microsoft Edge Addons Catalog

## v5.2.1 - 2020-05-05
- Add github actions to perform CI
- Add AMO badge to the README (Addresses #16)

## v5.2.0 - 2020-05-04
- Add support for `www.googleadservices.com` (Fixes #17)
- Improve messaging for Opera

## v5.1.2 - 2020-04-28
- Actually de-emphasize the Chrome Web Store in the README

## v5.1.1 - 2020-04-28
- Use more quotes in YAML, CircleCI choked somewhere

## v5.1.0 - 2020-04-28
- Ensure a protocol is in the URL (Fixes #12)
- De-emphasize the Chrome Web Store in the README (Fixes #13)
- Update devDependency `mocha` from `v7.1.0` to `v7.1.2`
- Try using node `v14` in all three CI
- CircleCI can run lint and mocha in parallel
- Add reports to `.gitignore`

## v5.0.0 - 2020-04-25
- Add `outgoing.prod.mozaws.net`
- Use new format for parsing

## v4.4.0 - 2020-04-13
- Add `gcc01.safelinks.protection.outlook.com`

## v4.3.0 - 2020-03-03
- Add `www.javlibrary.com`
- Use arrow functions in `index.js`
- Ensure `README` lists all sites

## v4.2.3 - 2020-03-02
- Update `mocha` from `v7.0.1` to `v7.1.0`
- Add `eslint`
- Use Object.prototype.hasOwnProperty
- Fix typo in test description
- Split test into `mocha` and `eslint`
- Use arrow functions in tests
- Remove `browser extension` from keywords in `package.json`

## v4.2.2 - 2020-02-02
- Update all CI platforms to node v12
- `manifest.json` uses spaces instead of tabs or spaces
- Update devDependency `mocha` from `v6.2.0` to `v7.0.1`
- Remove `package-lock.json`

## v4.2.1 - 2019-09-17
- Update README

## v4.2.0 - 2019-09-17
- Add `console.ebsta.com`

## v4.1.0 - 2019-08-06
- Add soundcloud's `gate.sc`

## v4.0.1 - 2018-10-23
- Make build.sh executable
- Fix image URL in README

## v4.0.0 - 2018-10-23
- Update SVG to occupy the whole frame
- Update app icons to occupy the whole frame
- Remove other sizes of icons
- Make the README match what's in the description
- Add .DS_Store to .gitignore
- Add a link in the README to install the extension
- List all supported domains in the README

## v3.9.0 - 2018-10-01
- Add a build script, outputs in build directory
- Move webstore assets into assets directory

## v3.8.0 - 2018-10-01
- Add icons, screenshots, and promo tile created by Janet Fu

## v3.7.1 - 2018-08-19
- `curseforge.com` actually double URI encodes their link

## v3.7.0 - 2018-08-19
- Add `curseforge.com`'s linkout

## v3.6.2 - 2018-06-22
- [CircleCI] Restore badge, they [rolled back the badge change](https://discuss.circleci.com/t/add-way-to-clear-1-0-is-sunsetting-on-status-badge/23085/13)

## v3.6.1 - 2018-06-21
- [CircleCI] Remove badge again, they've put [an unwelcome warning in the badge](https://discuss.circleci.com/t/add-way-to-clear-1-0-is-sunsetting-on-status-badge/23085)

## v3.6.0 - 2018-06-05
- Add `workable.com` (Fixes #3)
- [Packaging] Update description and copy to `manifest.json`

## v3.5.2 - 2018-05-24
- [npm] Add `.npmignore`
- [Dependencies] Update `mocha` from `v5.1.1` to `v5.2.0`

## v3.5.1 - 2018-05-24
- [CircleCI] Restore badge to README, it appears to be passing now, but no communication was received from CircleCI indicating it was fixed
- [Testing] Improve CHANGELOG version detection: The first version detected should match the package version
- [Packaging] Add `browser extension` to keywords

## v3.5.0 - 2018-05-24
- Add `*.digidip.net` (Fixes #2)
- Add support for wildcard subdomains
- [Testing] Add missing space in test description
- [Testing] Ensure CHANGELOG has an entry for current version
- Improve readability of URL polyfill

## v3.4.1 - 2018-05-18
- [CircleCI] Remove badge from README because it shows build as failing instead of passing, issue reported to CircleCI, but after a week nothing has changed

## v3.4.0 - 2018-05-11
- [Appveyor] Test 3 latest versions of node
- [Appveyor] Upload test results to the junit endpoint
- [README] Add CircleCI and Appveyor badges

## v3.3.2 - 2018-05-11
- [Appveyor] Add support for testing on `appveyor`

## v3.3.1 - 2018-05-11
- [Testing] Purposely failing test was successfully caught
- [Packaging] Match manifest and package versions
- [CircleCI] Try adding test results

## v3.3.0 - 2018-05-11
- [Testing] Switch from `tap` to `mocha`, it's faster
- [CircleCI] Output test results in xunit format in the `reports` directory

## v3.2.4 - 2018-05-08
- [CircleCI] `save_cache` uses `key` not `keys`

## v3.2.3 - 2018-05-08
- [CircleCI] Cache node_modules to share among jobs

## v3.2.2 - 2018-05-08
- Actually add travis badge to README
- [CircleCI] Add version to workflows
- [CircleCI] Requires should be a map
- [CircleCI] Fix spacing for test

## v3.2.1 - 2018-05-08
- Add travis badge to README

## v3.2.0 - 2018-05-08
- Add travis-ci

## v3.1.1 - 2018-05-08
- `workflows` instead of `workflow`
- `build` instead of `install`

## v3.1.0 - 2018-05-08
- Add circleci

## v3.0.0 - 2018-05-02
- Test with TAP
- Rename `src` to `webextension`
- Add `package.json`
- Add `node_modules` to `.gitignore`
- Put built web extensions in `build` directory

## v2.0.0 - 2018-04-29
- Add Google image search redirect
- Add `test.js`
- Reorganize into src & build directories
- Add compatibility for node

## v1.7.0 - 2018-04-25
- If there's no extra data, just return the key
- I should probably write some tests

## v1.6.0 - 2018-04-24
- Intercept all requests regardless of transport

## v1.5.0 - 2018-04-24
- `disq.us` adds some extraneous data to the url, we need to strip it
- Add dates and `v` to changelog

## v1.4.0 - 2018-04-24
- Add `disq.us`

## v1.3.0 - 2018-04-23
- Add `news.url.google.com`

## v1.2.0 - 2018-04-22
- Reorganize list of sites so each site is listed once
- Add gitignore

## v1.1.0 - 2018-03-22
- Add plus.url.google.com
- Update CHANGELOG format

## v1.0.0 - 2018-03-13
- Initial Release
