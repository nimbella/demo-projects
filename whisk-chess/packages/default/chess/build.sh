#!/bin/bash

set -e

pushd ../../../main
echo "package main" > index.go
echo 'var indexHTML = `<!DOCTYPE html>' >> index.go
cat ../web/index.html | sed 's/ + "api\/default\/chess"//' >> index.go
echo '`;' >> index.go
zip -r ../src.zip *
docker run -i openwhisk/action-golang-v1.15:latest <../src.zip -compile main >../packages/default/chess/chess.go.zip
popd
