#!/usr/bin/env bash

echo "Linting ..."
yarn workspaces foreach --parallel run lint