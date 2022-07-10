#!/usr/bin/env bash

# Find executables
changeset=$(yarn bin changeset)

echo "Getting packages to release ..."
# Find the impacted workspaces. Maybe yarn version?
yarn workspaces foreach --no-private --since run version --deferred

echo "Running changeset ..."

# Loop over list and call changeset


# Something with changesets


