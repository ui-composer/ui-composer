#!/usr/bin/env bash

echo "Cleaning workspaces ..."
yarn workspaces foreach --parallel run clean