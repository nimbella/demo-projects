#!/bin/bash

set -e

SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TSC=tsc

if type -P "${TSC}" &>/dev/null; then
    echo "tsc is in path, will use global install"
else
    echo "tsc is not in path, will use local install"
    TSC=${SELFDIR}/node_modules/.bin/tsc
fi

(cd "${SELFDIR}" && npm install && "${TSC}")
(cd "${SELFDIR}/src/hello" && npx webpack)
