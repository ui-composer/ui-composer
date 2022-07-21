UI Composer lets you **share more code between web and native apps while improving, rather than sacrificing, DX, performance, and code maintainability**.

# Release

Look into https://pr-release.org/

# Icons

The default icon font, [Lucide](https://icones.js.org/collection/lucide), comes from https://icones.js.org/.

## Configuration

You can configure a different icon font by...

# Contributing

## Dependencies

Always be cautious of the transitive size of dependencies. [packagephobia](https://packagephobia.com/) is a great resource for determining if a package is lean. Try to minimize adding dependencies to the CLI.


## Side Effects

UI Composer is optimized for tree-shaking, you should always make sure to list whatever files in your module have side effects. In UI Composer modules we use the `.fx.*` extension on these files (this makes it easier to target them with `sideEffects`).

[**Learn more about side effects**](https://webpack.js.org/guides/tree-shaking/)

```json
{
  "sideEffects": false
}
```

## Entry Point and Types

We recommend you name the initial file after the module for easier searching. Be sure to define the `types` file as well.

> 💡 Note that the `"typings"` field is synonymous with `"types"` field, UI Composer uses the TypeScript preferred `"types"` field.

[**Learn more about "types" field**](https://webpack.js.org/guides/tree-shaking/)

```json
{
  "main": "build/Camera.js",
  "types": "build/Camera.d.ts"
}
```

> 💡 You technically don't need to define the types file if it's named the same as the `main` file but Expo modules always define it (which is what TypeScript recommends).