declare global {
  import { StringKeyOf } from 'type-fest';

  export type Stringify<T> = Extract<T, string>;
  export type StringKey<T> = T extends string ? T : string;
  export type StringToNumberObject = { [alias: string]: number };
  export type StringToStringObject = { [alias: string]: string };
  export type VariantsConfig = {
    variants: {
      [alias: string]: unknown;
    };
  };
  export type GetVariant<
    Config extends VariantsConfig,
    Variant extends Extract<keyof Config['variants'], string>
  > = Config['variants'][Variant];

  export interface BackgroundColorProps<PaletteToken> {
    backgroundColor?: PaletteToken;
    dangerouslySetBackgroundColor?: string;
  }

  export interface BorderColorProps<PaletteToken> {
    borderColor?: PaletteToken;
    borderColorVertical?: PaletteToken;
    borderColorHorizontal?: PaletteToken;
    borderTopColor?: PaletteToken;
    borderBottomColor?: PaletteToken;
    borderStartColor?: PaletteToken;
    borderEndColor?: PaletteToken;
    dangerouslySetBorderColor?: string;
    dangerouslySetBorderColorVertical?: string;
    dangerouslySetBorderColorHorizontal?: string;
    dangerouslySetBorderTopColor?: string;
    dangerouslySetBorderBottomColor?: string;
    dangerouslySetBorderStartColor?: string;
    dangerouslySetBorderEndColor?: string;
  }

  export interface BorderRadiusProps<
    BorderRadius extends StringToNumberObject,
    BorderRadiusToken = StringKeyOf<BorderRadius>
  > {
    borderRadius?: BorderRadiusToken;
    borderRadiusTop?: BorderRadiusToken; // convenience
    borderRadiusBottom?: BorderRadiusToken; // convenience
    borderTopStartRadius?: BorderRadiusToken;
    borderTopEndRadius?: BorderRadiusToken;
    borderBottomStartRadius?: BorderRadiusToken;
    borderBottomEndRadius?: BorderRadiusToken;
  }

  export interface BorderWidthProps<
    BorderWidth extends StringToNumberObject,
    BorderWidthToken = BorderWidth extends undefined ? number : StringKeyOf<BorderWidth>
  > {
    borderWidth?: BorderWidthToken;
    borderWidthVertical?: BorderWidthToken; // convenience
    borderWidthHorizontal?: BorderWidthToken; // convenience
    borderTopWidth?: BorderWidthToken;
    borderBottomWidth?: BorderWidthToken;
    borderStartWidth?: BorderWidthToken;
    borderEndWidth?: BorderWidthToken;
  }

  export interface ColorProps<PaletteToken> {
    color?: PaletteToken;
    dangerouslySetColor?: string;
  }

  export type DimensionProps = {
    height?: number | string;
    width?: number | string;
    maxHeight?: number | string | undefined;
    maxWidth?: number | string | undefined;
    minHeight?: number | string | undefined;
    minWidth?: number | string | undefined;
  };

  export type DisplayProps = {
    display?: 'flex' | 'none';
    block?: boolean;
    opacity?: number;
  };

  export type FlexProps = {
    flex?: number | undefined;
    flexBasis?: number | string | undefined;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
    flexGrow?: number | undefined;
    flexShrink?: number | undefined;
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | undefined;
    alignContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'stretch'
      | 'space-between'
      | 'space-around'
      | undefined;
    alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined;
    alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined;
    justifyContent?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | undefined;
  };

  export type PsuedoStateProps = {
    disabled?: boolean;
    /** Is the element currenty loading. */
    loading?: boolean;
    pressed?: boolean;
  };

  export interface SpacingProps<SpacingToken extends number> {
    /** Apply inner spacing on all sides. */
    spacing?: SpacingToken;
    /** Apply inner spacing on the leading and trailing sides. */
    spacingHorizontal?: SpacingToken;
    /** Apply inner spacing on the top and bottom sides. */
    spacingVertical?: SpacingToken;
    /** Apply inner spacing on the bottom side. */
    spacingBottom?: SpacingToken;
    /** Apply inner spacing on the trailing side. */
    spacingEnd?: SpacingToken;
    /** Apply inner spacing on the leading side. */
    spacingStart?: SpacingToken;
    /** Apply inner spacing on the top side. */
    spacingTop?: SpacingToken;
    /** Apply negative outer spacing on all sides. */
    offset?: SpacingToken;
    /** Apply negative outer spacing on the top and bottom sides. */
    offsetVertical?: SpacingToken;
    /** Apply negative outer spacing on the leading and trailing sides. */
    offsetHorizontal?: SpacingToken;
    /** Apply negative outer spacing on the bottom side. */
    offsetBottom?: SpacingToken;
    /** Apply negative outer spacing on the trailing side. */
    offsetEnd?: SpacingToken;
    /** Apply negative outer spacing on the leading side. */
    offsetStart?: SpacingToken;
    /** Apply negative outer spacing on the top side. */
    offsetTop?: SpacingToken;
  }

  export interface StyleProps {
    style?: CSS.Properties<number | string>;
  }

  export interface TypographyProps<
    TextConfig extends VariantsConfig,
    IconConfig extends VariantsConfig,
    TextVariant = Stringify<keyof TextConfig['variants']>,
    IconVariant = Stringify<keyof IconConfig['variants']>
  > {
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    fontFamily?:
      | GetVariant<TextConfig, TextVariant>['fontFamily']
      | GetVariant<IconConfig, IconVariant>['fontFamily'];
    fontWeight?:
      | GetVariant<TextConfig, TextVariant>['fontWeight']
      | GetVariant<IconConfig, IconVariant>['fontWeight'];
    lineHeight?: GetVariant<TextConfig, TextVariant>['lineHeight'];
    fontSize?:
      | GetVariant<TextConfig, TextVariant>['fontSize']
      | GetVariant<IconConfig, IconVariant>['fontSize'];
    dangerouslySetFontFamily?: string;
    dangerouslySetFontWeight?: number | string;
    dangerouslySetLineHeight?: number;
    dangerouslySetFontSize?: number;
  }

  export type ThemableProps<
    BorderRadius,
    BorderWidth,
    IconConfig,
    PaletteToken,
    SpacingToken,
    TextConfig
  > = BackgroundColorProps<PaletteToken> &
    BorderColorProps<PaletteToken> &
    BorderRadiusProps<BorderRadius> &
    BorderWidthProps<BorderWidth> &
    ColorProps<PaletteToken> &
    SpacingProps<SpacingToken> &
    StyleProps &
    TypographyProps<TextConfig, IconConfig> &
    DimensionProps &
    DisplayProps &
    FlexProps &
    PsuedoStateProps;
}
