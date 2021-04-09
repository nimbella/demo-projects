#!/bin/bash

set -e

SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$SELFDIR/../../../lib/build.sh
npm install --production
