// Makes all properties visible when hovering over the type
export type Expand<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : T;

export type ExpandDeep<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandDeep<O[K]> }
    : never
  : T;

/* STRING */
export type Stringify<T> = Extract<T, string>;
export type StringKey<T> = T extends string ? T : string;
export type StringToNumberObject = { [alias: string]: number };
export type StringToStringObject = { [alias: string]: string };
