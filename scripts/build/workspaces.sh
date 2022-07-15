#!/usr/bin/env bash

# Find executables
tsc=$(yarn bin tsc)

echo "Building Typescript ..."
yarn exec $tsc -b

echo "Building Javascript ..."
# $* - passes args to command below. https://yarnpkg.com/cli/workspaces/foreach has list of args available
yarn workspaces foreach --topological $* run build
