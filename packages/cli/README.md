@ui-composer/cli

# Usage
<!-- usage -->
```sh-session
$ npm install -g @ui-composer/cli
$ ui-composer COMMAND
running command...
$ ui-composer (--version|-v)
@ui-composer/cli/0.0.0 darwin-x64 node-v16.14.1
$ ui-composer --help [COMMAND]
USAGE
  $ ui-composer COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ui-composer build [SRC]`](#ui-composer-build-src)
* [`ui-composer help [COMMAND]`](#ui-composer-help-command)
* [`ui-composer version`](#ui-composer-version)

## `ui-composer build [SRC]`

Build project with ESBuild

```
USAGE
  $ ui-composer build [SRC] [--cwd <value>] [--format <value>] [--include <value>] [--ignore <value>]
    [--out-dir <value>] [--out-extension <value>] [--delete-dir-on-start] [--watch]

ARGUMENTS
  SRC  [default: src] source directory to run build on

FLAGS
  --cwd=<value>            [default: /Users/katherinemartinez/src/ui-composer/packages/cli] Current working directory
  --delete-dir-on-start    Delete the out directory before compilation
  --format=<value>         [default: cjs] Format of the output
  --ignore=<value>         [default: **/*.d.ts] List of glob paths to **not** compile. (comma separated)
  --include=<value>        [default: **/*.{js,mjs,cjs,ts,tsx,json,css}] List of glob paths to compile. (comma separated)
  --out-dir=<value>        [default: dist] d
  --out-extension=<value>  [default: js] Customize the file extension of the files that esbuild generates to something
                           other than .js or .css. This option is useful if you are using esbuild to generate multiple
                           files and you have to use the outdir option instead of the outfile option
                           [link](https://esbuild.github.io/api/#out-extension)
  --watch                  Watch for changes and rebuild

DESCRIPTION
  Build project with ESBuild

EXAMPLES
  $ ui-composer build
```

## `ui-composer help [COMMAND]`

Display help for ui-composer.

```
USAGE
  $ ui-composer help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ui-composer.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `ui-composer version`

```
USAGE
  $ ui-composer version [--json] [--verbose]

FLAGS
  --verbose  Show additional information about the CLI.

GLOBAL FLAGS
  --json  Format output as json.

FLAG DESCRIPTIONS
  --verbose  Show additional information about the CLI.

    Additionally shows the architecture, node version, operating system, and versions of plugins that the CLI is using.
```

_See code: [@oclif/plugin-version](https://github.com/oclif/plugin-version/blob/v1.1.1/src/commands/version.ts)_
<!-- commandsstop -->
