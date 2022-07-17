import React, { createElement, memo } from 'react';
import alpha from 'color-alpha';
import CSS from 'csstype';
import mapValues from 'lodash/mapValues';
import { Merge, ReadonlyDeep, StringKeyOf } from 'type-fest';

import { Expand } from './types';

type Stringify<T> = Extract<T, string>;

type DisplayProps = {
  display?: 'flex' | 'none';
};

type FlexProps = {
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

type TypographyConfig = {
  [alias: string]: {
    fontFamily: string;
    fontWeight: number;
    lineHeight: number;
    fontSize: number;
  };
};
type StringToNumberObject = { [alias: string]: number };
type StringToStringObject = { [alias: string]: string };
type PaletteConfig<Colors extends StringToStringObject> = ReadonlyDeep<{
  [alias: string]: Stringify<keyof Colors> | [Stringify<keyof Colors>, number];
}>;

function createTheme<
  BorderRadius extends StringToNumberObject,
  BorderWidth extends StringToNumberObject | undefined,
  Colors extends StringToStringObject,
  Spacing extends StringToNumberObject,
  Typography extends TypographyConfig,
  Palette extends PaletteConfig<Colors>
>(config: {
  colors: Colors;
  palette: Palette;
  borderRadius: BorderRadius;
  borderWidth?: BorderWidth;
  spacing: Spacing;
  typography: Typography;
}) {
  type PaletteToken = StringKeyOf<Palette>;
  type PaletteProcessed = Record<PaletteToken, string>;

  type BackgroundColorProps = {
    backgroundColor?: PaletteToken;
  };

  type BorderColorProps = {
    borderColor?: PaletteToken;
    borderColorVertical?: PaletteToken;
    borderColorHorizontal?: PaletteToken;
    borderTopColor?: PaletteToken;
    borderBottomColor?: PaletteToken;
    borderStartColor?: PaletteToken;
    borderEndColor?: PaletteToken;
  };

  type BorderRadiusToken = StringKeyOf<BorderRadius>;
  type BorderRadiusProps = {
    borderRadius?: BorderRadiusToken;
    borderRadiusTop?: BorderRadiusToken; // convenience
    borderRadiusBottom?: BorderRadiusToken; // convenience
    borderTopStartRadius?: BorderRadiusToken;
    borderTopEndRadius?: BorderRadiusToken;
    borderBottomStartRadius?: BorderRadiusToken;
    borderBottomEndRadius?: BorderRadiusToken;
  };

  type BorderWidthToken = BorderWidth extends undefined ? number : StringKeyOf<BorderWidth>;
  type BorderWidthProps = {
    borderWidth?: BorderWidthToken;
    borderWidthVertical?: BorderWidthToken; // convenience
    borderWidthHorizontal?: BorderWidthToken; // convenience
    borderTopWidth?: BorderWidthToken;
    borderBottomWidth?: BorderWidthToken;
    borderStartWidth?: BorderWidthToken;
    borderEndWidth?: BorderWidthToken;
  };

  type ColorProps = {
    color?: PaletteToken;
  };

  type SpacingToken = Extract<keyof Spacing, string | number>;
  type SpacingProps = {
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
  };

  type ThemeableProps = Expand<
    BackgroundColorProps &
      ColorProps &
      BorderColorProps &
      BorderRadiusProps &
      BorderWidthProps &
      DisplayProps &
      FlexProps &
      SpacingProps
  >;

  const paletteProcessed: PaletteProcessed = mapValues(config.palette, val => {
    if (typeof val === 'string') {
      return config.colors[val];
    }
    const [colorAlias, opacity] = val;
    const color = config.colors[colorAlias];
    return alpha(color, opacity);
  });

  function compose<T extends React.ElementType | React.ComponentType>(
    Component: T,
    defaultProps?: ThemeableProps
  ) {
    function EnhancedComponent({
      backgroundColor = defaultProps?.backgroundColor,
      color = defaultProps?.color,
      borderColor = defaultProps?.borderColor,
      borderColorVertical = defaultProps?.borderColorVertical ?? borderColor, // convenience
      borderColorHorizontal = defaultProps?.borderColorHorizontal ?? borderColor, // convenience
      borderTopColor = defaultProps?.borderTopColor ?? borderColorVertical,
      borderBottomColor = defaultProps?.borderBottomColor ?? borderColorVertical,
      borderStartColor = defaultProps?.borderStartColor ?? borderColorHorizontal,
      borderEndColor = defaultProps?.borderEndColor ?? borderColorHorizontal,
      borderRadius = defaultProps?.borderRadius,
      borderRadiusTop = defaultProps?.borderRadiusTop ?? borderRadius, // convenience
      borderRadiusBottom = defaultProps?.borderRadiusBottom ?? borderRadius, // convenience
      borderTopStartRadius = defaultProps?.borderTopStartRadius ?? borderRadiusTop,
      borderTopEndRadius = defaultProps?.borderTopEndRadius ?? borderRadiusTop,
      borderBottomStartRadius = defaultProps?.borderBottomStartRadius ?? borderRadiusBottom,
      borderBottomEndRadius = defaultProps?.borderBottomEndRadius ?? borderRadiusBottom,
      borderWidth = defaultProps?.borderWidth,
      borderWidthVertical = defaultProps?.borderWidthVertical ?? borderWidth, // convenience
      borderWidthHorizontal = defaultProps?.borderWidthHorizontal ?? borderWidth, // convenience
      borderTopWidth = defaultProps?.borderTopWidth ?? borderWidthVertical,
      borderBottomWidth = defaultProps?.borderBottomWidth ?? borderWidthVertical,
      borderStartWidth = defaultProps?.borderStartWidth ?? borderWidthHorizontal,
      borderEndWidth = defaultProps?.borderEndWidth ?? borderWidthHorizontal,
      display = 'flex',
      flex = defaultProps?.flex,
      flexBasis = defaultProps?.flexBasis,
      flexDirection = defaultProps?.flexDirection,
      flexGrow = defaultProps?.flexGrow,
      flexShrink = defaultProps?.flexShrink,
      flexWrap = defaultProps?.flexWrap,
      alignContent = defaultProps?.alignContent,
      alignItems = defaultProps?.alignItems,
      alignSelf = defaultProps?.alignSelf,
      justifyContent = defaultProps?.justifyContent,
      spacing = defaultProps?.spacing,
      spacingVertical = defaultProps?.spacingVertical ?? spacing, // convenience
      spacingHorizontal = defaultProps?.spacingHorizontal ?? spacing, // convenience
      spacingTop = defaultProps?.spacingTop ?? spacingVertical,
      spacingBottom = defaultProps?.spacingBottom ?? spacingVertical,
      spacingStart = defaultProps?.spacingStart ?? spacingHorizontal,
      spacingEnd = defaultProps?.spacingEnd ?? spacingHorizontal,
      offset = defaultProps?.offset,
      offsetVertical = defaultProps?.offsetVertical ?? offset, // convenience
      offsetHorizontal = defaultProps?.offsetHorizontal ?? offset, // convenience
      offsetTop = defaultProps?.offsetTop ?? offsetVertical,
      offsetBottom = defaultProps?.offsetBottom ?? offsetVertical,
      offsetStart = defaultProps?.offsetStart ?? offsetHorizontal,
      offsetEnd = defaultProps?.offsetEnd ?? offsetHorizontal,
      ...nativeProps
    }: Merge<React.ComponentProps<T>, ThemeableProps>) {
      const style: CSS.Properties<string | number> = {
        display,
      };

      if (backgroundColor) {
        style.backgroundColor = paletteProcessed[backgroundColor];
      }

      if (color) {
        style.color = paletteProcessed[color];
      }

      if (borderStartColor) {
        /** @todo figure out web version of RN's borderStartColor  */
        style.borderLeftColor = paletteProcessed[borderStartColor];
      }

      if (borderEndColor) {
        /** @todo figure out web version of RN's borderEndColor  */
        style.borderRightColor = paletteProcessed[borderEndColor];
      }

      if (borderTopColor) {
        style.borderTopColor = paletteProcessed[borderTopColor];
      }

      if (borderBottomColor) {
        style.borderBottomColor = paletteProcessed[borderBottomColor];
      }

      if (borderBottomStartRadius) {
        /** @todo figure out web version of RN's borderBottomStartRadius  */
        style.borderBottomLeftRadius = config.borderRadius[borderBottomStartRadius];
      }

      if (borderBottomEndRadius) {
        /** @todo figure out web version of RN's borderBottomEndRadius  */
        style.borderBottomRightRadius = config.borderRadius[borderBottomEndRadius];
      }

      if (borderTopWidth) {
        style.borderTopWidth = config.borderWidth
          ? config.borderWidth[borderTopWidth]
          : borderTopWidth;
      }

      if (borderBottomWidth) {
        style.borderBottomWidth = config.borderWidth
          ? config.borderWidth[borderBottomWidth]
          : borderBottomWidth;
      }

      if (borderStartWidth) {
        /** @todo figure out web version of RN's borderStartWidth  */
        style.borderLeftWidth = config.borderWidth
          ? config.borderWidth[borderStartWidth]
          : borderStartWidth;
      }

      if (borderEndWidth) {
        /** @todo figure out web version of RN's borderEndWidth  */
        style.borderRightWidth = config.borderWidth
          ? config.borderWidth[borderEndWidth]
          : borderEndWidth;
      }

      if (borderTopStartRadius) {
        /** @todo figure out web version of RN's borderTopStartRadius  */
        style.borderTopLeftRadius = config.borderRadius[borderTopStartRadius];
      }

      if (borderTopEndRadius) {
        /** @todo figure out web version of RN's borderTopEndRadius  */
        style.borderTopRightRadius = config.borderRadius[borderTopEndRadius];
      }

      if (borderBottomStartRadius) {
        /** @todo figure out web version of RN's borderBottomStartRadius  */
        style.borderBottomLeftRadius = config.borderRadius[borderBottomStartRadius];
      }

      if (borderBottomEndRadius) {
        /** @todo figure out web version of RN's borderBottomEndRadius  */
        style.borderBottomRightRadius = config.borderRadius[borderBottomEndRadius];
      }

      if (flex) {
        style.flex = flex;
      }

      if (flexBasis) {
        style.flexBasis = flexBasis;
      }

      if (flexDirection) {
        style.flexDirection = flexDirection;
      }

      if (flexGrow) {
        style.flexGrow = flexGrow;
      }

      if (flexShrink) {
        style.flexShrink = flexShrink;
      }

      if (flexWrap) {
        style.flexWrap = flexWrap;
      }

      if (alignContent) {
        style.alignContent = alignContent;
      }

      if (alignItems) {
        style.alignItems = alignItems;
      }

      if (alignSelf) {
        style.alignSelf = alignSelf;
      }

      if (justifyContent) {
        style.justifyContent = justifyContent;
      }

      if (spacingTop) {
        style.paddingTop = config.spacing[spacingTop];
      }

      if (spacingBottom) {
        style.paddingBottom = config.spacing[spacingBottom];
      }

      if (spacingStart) {
        /** @todo figure out web version of RN's paddingStart  */
        style.paddingLeft = config.spacing[spacingStart];
      }

      if (spacingEnd) {
        /** @todo figure out web version of RN's paddingEnd  */
        style.paddingRight = config.spacing[spacingEnd];
      }

      if (offsetTop) {
        style.marginTop = config.spacing[offsetTop];
      }

      if (offsetBottom) {
        style.marginBottom = config.spacing[offsetBottom];
      }

      if (offsetStart) {
        /** @todo figure out web version of RN's paddingEnd  */
        style.marginLeft = config.spacing[offsetStart];
      }

      if (offsetEnd) {
        /** @todo figure out web version of RN's paddingEnd  */
        style.marginRight = config.spacing[offsetEnd];
      }

      /** This is a Web HTML element */
      if (typeof Component === 'string') {
        return createElement(Component, {
          style,
          ...nativeProps,
        });
      }

      // @ts-expect-error This is fine
      return <Component style={style} {...nativeProps} />;
    }

    return memo(EnhancedComponent);
  }

  // const styler = createStyler(config);

  return {
    config,
    compose,
    types: {
      tokens: {
        backgroundColor: undefined as unknown as PaletteToken,
        borderColor: undefined as unknown as PaletteToken,
        borderRadius: undefined as unknown as BorderRadiusToken,
        borderWidth: undefined as unknown as BorderWidthToken,
        color: undefined as unknown as PaletteToken,
        spacing: undefined as unknown as SpacingToken,
      },
      props: {
        backgroundColorProps: {} as BackgroundColorProps,
        borderColorProps: {} as BorderColorProps,
        borderRadiusProps: {} as BorderRadiusProps,
        borderWidthProps: {} as BorderWidthProps,
        colorProps: {} as ColorProps,
        spacingProps: {} as SpacingProps,
      },
    },
  };
}

export default createTheme;
