#!/usr/bin/env bash

VERSION=$1

echo "Building Intercept Redirect $VERSION"

cd webextension
zip ../build/intercept-redirect-$VERSION.zip ./* -r -9
cd ..
