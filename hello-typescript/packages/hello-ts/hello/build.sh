#!/bin/bash

set -e

SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

../../../lib/build.sh
npm install --production
