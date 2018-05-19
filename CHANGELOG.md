# Intercept Redirect

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
