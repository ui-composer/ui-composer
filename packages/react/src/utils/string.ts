import { camelCase as _camelCase, kebabCase as _kebabCase, upperFirst } from 'lodash';
import { CamelCase, KebabCase, PascalCase } from 'type-fest';

export function camelCase<T extends string>(str: T): CamelCase<T> {
  return _camelCase(str) as CamelCase<T>;
}

export function pascalCase<T extends string>(str: T) {
  return upperFirst(camelCase(str)) as PascalCase<typeof str>;
}

export function kebabCase<T extends string>(str: T) {
  return _kebabCase(str) as KebabCase<typeof str>;
}

export function toCssVar<T extends string>(str: T) {
  return `--${kebabCase(str)}` as const;
}

export function toCssVarFn<T extends string>(str: T) {
  return `var(${toCssVar(str)})` as const;
}

export function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}
