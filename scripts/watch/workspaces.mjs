#!/usr/bin/env zx

await $`concurrently 'tsc -b --watch' 'yarn workspaces foreach --parallel $* run watch'`;
