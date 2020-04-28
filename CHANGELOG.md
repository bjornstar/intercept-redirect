# Intercept Redirect

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
