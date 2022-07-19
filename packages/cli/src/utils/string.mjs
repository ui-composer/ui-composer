import { camelize, decamelize, pascalize } from 'humps';

/** @param {string} str */
export function camelCase(str) {
  return camelize(str);
}

/** @param {string} str */
export function pascalCase(str) {
  return pascalize(str);
}

/** @param {string} str */
export function kebabCase(str) {
  return decamelize(str, { separator: '-' });
}

/** @param {string} str */
export function snakeCase(str) {
  return decamelize(str, { separator: '_' });
}
