import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import mapValues from 'lodash/mapValues';

import type { PaletteConfig, StringToStringObject } from './types';

extend([mixPlugin]);

export function createPalette<
  Colors extends StringToStringObject,
  Palette extends PaletteConfig<Colors>
>(config: { colors: Colors; palette: Palette }) {
  return {
    getPaletteTuple: function getPaletteTuple(val: Palette[keyof Palette]): [keyof Colors, number] {
      if (typeof val === 'string') {
        return [val, 1];
      }
      return [val[0], val[1]];
    },
    getColorStep: function getColorStep(val: keyof Colors) {
      const [_, step = 100] = String(val).match(/[a-z]+|[^a-z]+/gi) ?? [];
      return Number(step);
    },
    get tuples() {
      return mapValues(config.palette, val => {
        return this.getPaletteTuple(val);
      });
    },
    get tints() {
      return mapValues(this.tuples, ([colorAlias]) => {
        return this.getColorStep(colorAlias);
      });
    },
    get rgbaStrings() {
      return mapValues(this.tuples, ([colorAlias, opacity]) => {
        const color = config.colors[colorAlias];
        return colord(color).alpha(opacity).toRgbString();
      });
    },
    get pseudoStyles() {
      return mapValues(config.palette, (_, paletteAlias) => {
        const colorRgbaString = this.rgbaStrings[paletteAlias];
        const tint = this.tints[paletteAlias];
        const backgroundRgbaString = this.rgbaStrings.background;
        const foregroundRgbaString = tint > 60 ? backgroundRgbaString : this.rgbaStrings.foreground;

        const opacity = {
          disabled: this.opacities.disabled,
          pressed: this.opacities.pressed[tint],
          hovered: this.opacities.hovered[tint],
        };

        const underlay = {
          disabled: backgroundRgbaString,
          pressed: foregroundRgbaString,
          hovered: foregroundRgbaString,
        };

        return {
          disabled: {
            contentOpacity: opacity.disabled,
            backgroundColor: colord(underlay.disabled)
              .mix(colorRgbaString, opacity.disabled)
              .toHex(),
          },
          pressed: {
            contentOpacity: opacity.pressed,
            backgroundColor: colord(underlay.pressed).mix(colorRgbaString, opacity.pressed).toHex(),
          },
          hovered: {
            contentOpacity: opacity.hovered,
            backgroundColor: colord(underlay.hovered).mix(colorRgbaString, opacity.hovered).toHex(),
          },
        };
      });
    },
    opacities: {
      hovered: {
        0: 0.98,
        5: 0.98,
        10: 0.97,
        15: 0.97,
        20: 0.96,
        30: 0.95,
        40: 0.94,
        50: 0.93,
        60: 0.92,
        70: 0.91,
        80: 0.9,
        90: 0.89,
        100: 0.88,
      },
      pressed: {
        0: 0.92,
        5: 0.92,
        10: 0.91,
        15: 0.91,
        20: 0.9,
        30: 0.89,
        40: 0.88,
        50: 0.87,
        60: 0.86,
        70: 0.85,
        80: 0.84,
        90: 0.83,
        100: 0.82,
      },
      disabled: 0.38,
    },
  };
}
