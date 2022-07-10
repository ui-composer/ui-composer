import type { ComponentProps } from 'react';
import * as CSS from 'csstype';
import type { CamelCase, KebabCase } from 'type-fest';

export type AnyObject = {
  [key: string]: unknown;
};

/* STRING */
export type StringKey<T> = T extends string ? T : string;
export type CssVariable<T extends string> = `--${KebabCase<T>}`;
export type CssVariableFn<T extends string> = `var(${CssVariable<T>})`;

/* COMPONENTS */
export type HtmlElement = keyof JSX.IntrinsicElements;

export type DynamicTag<T extends HtmlElement> = {
  as?: T;
} & ComponentProps<T>;

export type ExtractCssValues<T extends keyof CSS.Properties, Filter extends string> = Extract<
  CamelCase<CSS.Properties[T]>,
  Filter
>;
