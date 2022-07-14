#!/usr/bin/env zx

await $`concurrently 'tsc -b --watch' './scripts/watch/workspaces.sh'`;

await $`yarn workspaces foreach --parallel $* run watch`;
