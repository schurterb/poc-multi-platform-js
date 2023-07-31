#!/bin/bash

PWD=$(pwd)

### If old build folder exists, run cleanup

### download node modules
echo "Downloading Node Modules"
cd framework
npm i
rm -f package-lock.json
cd ..

# cd src
# npm i
# rm -f package-lock.json
# cd ...

### Set up build folder
echo "Setting up build foder"
mkdir -p build/bin
mkdir -p build/www/js
mkdir -p build/cloud

# move server-side code into part
echo "Moving server-side code into build folder"
cp -rf framework/server/server.mjs build/bin
cp -rf framework/server/tools.mjs build/bin
cp -rf framework/node_modules build
cp -rf src/core/* build/bin
cp -f scripts/run.sh build/bin/run
chmod +x build/bin/run

# move client-side code into part
echo "Moving client-side code into build folder"
cp -rf framework/web/* build/www/js
cp -rf src/core/* build/www/js
cp -rf src/www/* build/www

# move serverless code into part
echo "Moving serverless code into build folder"
# TODO: How to do this part effectively and generally?
cp -rf framework/server/lambda.mjs build/cloud
cp -rf framework/node_modules build/cloud
cp -rf src/core/* build/bin


### Deploy serverless code, if applicable








