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
* [`ui-composer icons:convert [SRC]`](#ui-composer-iconsconvert-src)
* [`ui-composer rename SRC`](#ui-composer-rename-src)
* [`ui-composer version`](#ui-composer-version)

## `ui-composer build [SRC]`

Build project with ESBuild

```
USAGE
  $ ui-composer build [SRC] [--cwd <value>] [--format <value>] [--ignore <value>] [-d <value>] [--include
    <value>] [--out-extension <value>] [--delete-dir-on-start] [--watch]

ARGUMENTS
  SRC  [default: src/**/*.{js,mjs,cjs,ts,tsx,json,css}] Source directory to run build on

FLAGS
  -d, --dest=<value>       [default: dist] Destination for built files
  --cwd=<value>            [default: /Users/katherinemartinez/src/ui-composer/packages/cli] Current working directory
  --delete-dir-on-start    Delete the out directory before compilation
  --format=<value>         [default: cjs] Format of the output
  --ignore=<value>         [default: **/*.d.ts] List of glob paths to **not** compile. (comma separated)
  --include=<value>        [default: js,mjs,cjs,ts,tsx,json,css] List of extensions to compile. (comma separated)
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

## `ui-composer icons:convert [SRC]`

Convert svg icons to icon font, generate typescript types and write to disk

```
USAGE
  $ ui-composer icons:convert [SRC] -d <value> --fontName <value> [--cwd <value>] [--fontHeight <value>] [--format
    woff|woff2|ttf|svg|eot] [--startUnicode <value>] [--normalize] [--skip-types]

ARGUMENTS
  SRC  [default: src/icons/**/*.svg] List of glob paths to convert (comma separated)

FLAGS
  -d, --dest=<value>      (required) [default: src/icons] Destination for generated font files
  --cwd=<value>           [default: /Users/katherinemartinez/src/ui-composer/packages/cli] Current working directory
  --fontHeight=<value>    [default: 4096] The font height of the generated font
  --fontName=<value>      (required) The font family name of the generated font
  --format=<option>...    [default: ttf] Format of the output (comma separated)
                          <options: woff|woff2|ttf|svg|eot>
  --normalize             Normalize icons by scaling them to the height of the highest icon.
  --skip-types            Generate Typescript types for the icons
  --startUnicode=<value>  [default: 61440] The start unicode of the generated font

DESCRIPTION
  Convert svg icons to icon font, generate typescript types and write to disk
```

## `ui-composer rename SRC`

Build project with ESBuild

```
USAGE
  $ ui-composer rename [SRC] [--cwd <value>] [--output <value>] [--ignore <value>] [--format
    camelCase|kebab-case|snake_case|Pascal Case] [--sequential] [--replace <value>]

ARGUMENTS
  SRC  List of glob path(s) to rename

FLAGS
  --cwd=<value>      [default: /Users/katherinemartinez/src/ui-composer/packages/cli] Current working directory
  --format=<option>  [default: kebab-case] Format the final output after any replacements
                     <options: camelCase|kebab-case|snake_case|Pascal Case>
  --ignore=<value>   List of glob paths to **not** rename. (comma separated)
  --output=<value>   Destination for renamed files
  --replace=<value>  Replace a string in the file name.
  --sequential       Append numbers to the end of the file name after any replacements

DESCRIPTION
  Build project with ESBuild

EXAMPLES
  $ ui-composer rename
```

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
