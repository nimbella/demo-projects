#!/bin/bash
set -e
rm -f index.js .include
npm install
npm run build
echo 'index.js' > .include
