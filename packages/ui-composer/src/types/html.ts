import type { ComponentProps } from 'react';

export type HtmlElement = keyof JSX.IntrinsicElements;

export type DynamicTag<T extends HtmlElement> = {
  as?: T;
} & ComponentProps<T>;
