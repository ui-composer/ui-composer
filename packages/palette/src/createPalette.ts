import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

extend([mixPlugin]);

type ColorsConfig<ColorAlias extends string = string> = Record<ColorAlias, string>;

type PaletteValue<Colors extends ColorsConfig> = Readonly<keyof Colors | [keyof Colors, number]>;

export type PaletteConfig<
  Colors extends ColorsConfig,
  PaletteAlias extends string = string
> = Readonly<Record<PaletteAlias, PaletteValue<Colors>>>;

// export type PaletteConfig<Colors extends ColorsConfig> = {
//   [alias: string]: keyof Colors | [keyof Colors, number];
//   background: keyof Colors | [keyof Colors, number];
//   foreground: keyof Colors | [keyof Colors, number];
// };

export function createPalette<
  Colors extends ColorsConfig,
  Palette extends PaletteConfig<Colors>
>(config: { colors: Colors; palette: Palette }) {
  return {
    getPaletteTuple: function getPaletteTuple(val: PaletteValue<Colors>): [keyof Colors, number] {
      if (typeof val === 'string') {
        return [val, 1];
      }
      return [val[0], val[1]];
    },
    getColorStep: function getColorStep(val: [keyof Colors, number]) {
      const [_, step = 100] = String(val).match(/[a-z]+|[^a-z]+/gi) ?? [];
      return Number(step);
    },
    get tuples() {
      const modifiedEntries = Object.entries(config.palette).map(([key, val]) => {
        return [key, this.getPaletteTuple(val)] as const;
      });
      return Object.fromEntries(modifiedEntries);
    },
    get tints() {
      const modifiedEntries = Object.entries(this.tuples).map(([key, val]) => {
        return [key, this.getColorStep(val)];
      });
      return Object.fromEntries(modifiedEntries);
    },
    get rgbaStrings() {
      const modifiedEntries = Object.entries(this.tuples).map(([key, val]) => {
        const [colorAlias, opacity] = val;
        const color = config.colors[colorAlias];
        const asRgbaString = colord(color).alpha(opacity).toRgbString();
        return [key, asRgbaString];
      });
      return Object.fromEntries(modifiedEntries);
    },
    get pseudoStyles() {
      const modifiedEntries = Object.keys(config.palette).map(key => {
        const colorRgbaString = this.rgbaStrings[key];
        const tint = this.tints[key];
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

        const pseudoStyles = {
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

        return [key, pseudoStyles];
      });

      return Object.fromEntries(modifiedEntries);
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
