#!/bin/bash

NS=$(nim auth current)
sed s/\${process.env.__OW_NAMESPACE}/$NS/ index.template > index.html
