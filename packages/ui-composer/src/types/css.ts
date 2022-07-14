import CSS from 'csstype';
import type { CamelCase, KebabCase } from 'type-fest';

export type CssVariable<T extends string> = `--${KebabCase<T>}`;
export type CssVariableFn<T extends string> = `var(${CssVariable<T>})`;
export type ExtractCssValues<T extends keyof CSS.Properties, Filter> = Extract<
  CamelCase<CSS.Properties[T]>,
  Filter
>;
