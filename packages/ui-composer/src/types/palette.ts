import { ReadonlyDeep } from 'type-fest';

import type { Stringify, StringToStringObject } from './helpers';

export type PaletteConfig<Colors extends StringToStringObject> = ReadonlyDeep<{
  [alias: string]: Stringify<keyof Colors> | [Stringify<keyof Colors>, number];
}> & {
  background: Stringify<keyof Colors> | [Stringify<keyof Colors>, number];
  foreground: Stringify<keyof Colors> | [Stringify<keyof Colors>, number];
};
