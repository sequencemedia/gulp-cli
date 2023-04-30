#!/bin/bash

npx eslint . "$@"

# npx eslint "test/**/*+(.mjs|.cjs|.js)" --no-ignore "$@"

FILES=$(find test -type f \( -name "*.mjs" -or -name "*.cjs" \) | grep -i node_modules)

npx eslint ${FILES/#/ } --no-ignore "$@"

exit 0
