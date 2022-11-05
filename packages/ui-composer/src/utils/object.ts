type AnyObject = {
  [key: string]: unknown;
};

export const emptyObject = {};

export function keys<T extends Record<string, unknown>>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}

export function entries<T extends Record<string, unknown>>(item: T) {
  return Object.entries(item) as Array<[keyof T, T[keyof T]]>;
}

export function mapKeys<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, obj: T) => string
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce((prev, key: keyof T) => {
    const newKey = callbackFn(obj[key], key, obj) as ReturnType<typeof callbackFn>;
    prev[newKey] = obj[key];
    return prev;
  }, {} as { [key in ReturnType<K>]: T[keyof T] });
}

export function mapValues<
  T extends AnyObject,
  K extends (value: T[keyof T], key: keyof T, i: number) => unknown
>(obj: T, callbackFn: K) {
  return Object.keys(obj).reduce((prev, key: keyof T, i) => {
    prev[key] = callbackFn(obj[key], key, i) as ReturnType<typeof callbackFn>;
    return prev;
  }, {} as { [key in keyof T]: ReturnType<K> });
}
