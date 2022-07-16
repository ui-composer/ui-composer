#!/usr/bin/env bash

echo "Formating workspaces ..."
yarn exec workspaces-to-typescript-project-references --includesRoot

yarn exec manypkg check