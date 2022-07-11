UI Composer lets you **share more code between web and native apps while improving, rather than sacrificing, DX, performance, and code maintainability**.

It does this by compiling typed inline styles - even ones containing conditional logic, themes, or responsivity - into efficient atomic CSS (or a hoisted StyleSheet on native).

This is a **win-win-win**: more performant, easier to write/maintain, and works on every platform. Typically you'd have to trade performance for DX, or both for cross-platform compatibility. With UI Composer, you don't!

In exchange you add some complexity with the compiler - but - it's both optional and very easy to granularly introspect or turn off.

The compiler does a lot, too - it analyzes logic, spreads, and nested ternaries, even flattening fully analyzable components to reduce tree depth signficantly.

#### Works with React ❤️

Work with your favorite libraries: `react` and `react-native` augmenting them with features and performance.

#### Themed, Responsive

Inline typed theme and media props, and accompanying `useTheme` and `useMedia` hooks work how you'd expect them to, but also compile away.

#### Faster Runtime

Almost no prop interpolation on inline styles and dynamic styles. Even with complex logical styling you get less runtime, light CSS output, and flatter component trees. CSS media queries and CSS variables run much faster than JS.

#### Less Runtime

UI Composer adds some to bundle size, but dramatically reduces render performance and extract what would be many style objects out at build time. Strictly style components (with no un-parseable props) are flattened to `div` or `span`, saving tree depth and hook calls.

#### Server-Side Rendering

UI Composer supports cross-browser server-side rendering ([see how we do it with Next.js](https://github.com/tamagui/tamagui/tree/master/packages/site)), even for responsive styles and variants.


## Key Features

### Variants

[Variants](/docs/core/styled#variants) as a first-class citizen, so you can design composable component APIs. Define a single variant, multiple variants, and even [Spread Variants](/docs/core/styled#spread-variants) which allow you to return dynamic styles, even at compile-time.

### Tokens

Define your own [tokens](/docs/intro/configuration) and seamlessly apply them as CSS values. CSS Properties are automatically mapped to token scales. Tokens can even be used in shorthand CSS properties.

### Themes

UI Composer provides a simple [theming](/docs/intro/themes) experience out of the box. Create as many themes as you need, and apply them wherever you want. Each theme generates a CSS class name which overrides the default tokens.

### Shorthands

[Shorthands](/docs/intro/configuration#shorthands) allow you to map shorthand properties to their longer cousins. This lets you create Tailwinds-like quick properties to style. These work with TypeScript as well, and are designed so you can bring them with you across different tamagui component kits.

### Responsivity

UI Composer lets you configure [media queries](/docs/core/use-media) and apply variants responsively using `$` props.

### Animations

Plug-in [animations](/docs/core/animations) with incredibly simple syntax.

### Fonts

A unique font system means you can publish and share font bundles including all their styles - vertical rythyms and all, and still get all the benefits of compilation speed.

### Hooks

The `useMedia` and `useTheme` hooks work reactively, avoiding re-renders, while giving you the same typed access as your normally have to your design system values. They work with the compiler as well when possible.

### Developer Experience

UI Composer provides a fully-typed API so all your TypeScript style properties, values, media queries and shorthands will be auto-completed for you. It provides a `// debug` pragma and `debug` prop that both allow easy introspection into whats happening at compile and runtime. In dev mode it puts a `data-` attribute that links every DOM node back to your original source.

<br />

### Why inline style props?

#### 🏎 Faster to write

Inline styles have a few developer-speed benefits over `StyleSheet.create`: they require fewer imports and fewer lines of code, and they save you from jumping between the top and bottom of your file whenever you want to change a style so you can see exactly whats happening where it's happening.

#### 💀 Easier to maintain, no dead code

`StyleSheet.create` forces you to manually link together the style with the node that's using the style. When you delete the style, you must delete the node, and when you delete a node, you have to manually check to be see if any other node is using that style before removing it.

#### 📚 Less reading/writing and naming

Fast inline styles and common tokens mean less having to name things. Shorthand style props that are flat often make the difference between one line and multiple.

#### 💃 Encourages dynamic styles

Changing between a style that's determined by a ternary or conditional and one that's static shouldn't be a hard choice. With StyleSheet there's some friction as you have to either inline it and save time and readability or extract it to the bottom and gain performance. With inline styles (and the compiler) you no longer have that friction: convert any prop to have a ternary and it works the same, and runs fast.


## Community

We're excited to see the community adopt UI Composer, raise issues, and provide feedback. Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Twitter](https://twitter.com/ui-composer)
- [GitHub Discussions](https://github.com/ui-composer/ui-composer/discussions)
- [GitHub](https://github.com/ui-composer/ui-composer)


## Credits

A big thanks to:

- [JSXStyle](https://github.com/jsxstyle/jsxstyle) for providing the original version of the compiler.
- [Modulz](https://github.com/modulz) for the bones of the website and inspiration on some Radix-like component APIs.
- [Moti](https://moti.fyi) for the foundation of the reanimated driver.
- [Framer Motion](https://github.com/framer/motion) for the AnimatePresence functionality.
