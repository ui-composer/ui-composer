import React, { createElement, memo } from 'react';
import CSS from 'csstype';
import { Merge, StringKeyOf } from 'type-fest';

import { getA11yProps } from './utils/getA11yProps';
import { emptyObject } from './utils/object';
import { createPalette } from './createPalette';
import {
  FlexProps,
  PaletteConfig,
  Stringify,
  StringToNumberObject,
  StringToStringObject,
  TypographyConfig,
} from './types';

type DisplayProps = {
  display?: 'flex' | 'none';
  block?: boolean;
  opacity?: number;
};

export type PsuedoStateProps = {
  disabled?: boolean;
  /** Is the element currenty loading. */
  loading?: boolean;
  pressed?: boolean;
};

export function createTheme<
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
  type PaletteToken = Stringify<keyof Palette>;
  type BackgroundColorProps = {
    backgroundColor?: PaletteToken;
    dangerouslySetBackgroundColor?: string;
  };

  type BorderColorProps = {
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
    dangerouslySetColor?: string;
  };

  type SpacingToken = Extract<keyof Spacing, number>;
  type SpacingProps = import('./types').SpacingPropsGeneric<SpacingToken>;

  type StyleProps = {
    style?: CSS.Properties<number | string>;
  };

  type TypographyToken = Stringify<keyof Typography>;
  type TypographyProps = import('./types').TypographyPropsGeneric<TypographyToken>;

  type DimensionProps = import('./types').DimensionProps;

  type ThemeableProps = BackgroundColorProps &
    ColorProps &
    BorderColorProps &
    BorderRadiusProps &
    BorderWidthProps &
    DimensionProps &
    DisplayProps &
    FlexProps &
    SpacingProps &
    PsuedoStateProps &
    StyleProps &
    TypographyProps;

  const palette = createPalette(config);

  function compose<T extends React.ElementType | React.ComponentType>(
    Component: T,
    defaultProps?: ThemeableProps
  ) {
    type NativeProps = React.ComponentProps<T>;
    type EnhancedComponentProps = Merge<ThemeableProps, NativeProps>;

    function EnhancedComponent({
      pressed = defaultProps?.pressed,
      loading = defaultProps?.loading,
      disabled = defaultProps?.disabled,
      style: styleProp = defaultProps?.style ?? emptyObject,
      backgroundColor = defaultProps?.backgroundColor,
      color = defaultProps?.color,
      block = defaultProps?.block,
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
      flexGrow = defaultProps?.flexGrow ?? block ? 1 : undefined,
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
      opacity = defaultProps?.opacity,
      textAlign = defaultProps?.textAlign,
      lineHeight = defaultProps?.lineHeight,
      fontFamily = defaultProps?.fontFamily,
      fontSize = defaultProps?.fontSize,
      fontWeight = defaultProps?.fontWeight,
      height = defaultProps?.height,
      width = defaultProps?.width,
      maxHeight = defaultProps?.maxHeight,
      maxWidth = defaultProps?.maxWidth,
      minHeight = defaultProps?.minHeight,
      minWidth = defaultProps?.minWidth,
      dangerouslySetColor = defaultProps?.dangerouslySetColor,
      dangerouslySetBackgroundColor = defaultProps?.dangerouslySetBackgroundColor,
      dangerouslySetBorderColor = defaultProps?.dangerouslySetBorderColor,
      dangerouslySetBorderColorVertical = defaultProps?.dangerouslySetBorderColorVertical ??
        dangerouslySetBorderColor,
      dangerouslySetBorderColorHorizontal = defaultProps?.dangerouslySetBorderColorHorizontal ??
        dangerouslySetBorderColor,
      dangerouslySetBorderTopColor = defaultProps?.dangerouslySetBorderTopColor ??
        dangerouslySetBorderColorVertical,
      dangerouslySetBorderBottomColor = defaultProps?.dangerouslySetBorderBottomColor ??
        dangerouslySetBorderColorVertical,
      dangerouslySetBorderStartColor = defaultProps?.dangerouslySetBorderStartColor ??
        dangerouslySetBorderColorHorizontal,
      dangerouslySetBorderEndColor = defaultProps?.dangerouslySetBorderEndColor ??
        dangerouslySetBorderColorHorizontal,
      ...nativeProps
    }: EnhancedComponentProps) {
      const style: CSS.Properties<string | number> = {
        display,
        ...styleProp,
      };

      if (backgroundColor) {
        style.backgroundColor = palette.rgbaStrings[backgroundColor];
      }

      if (dangerouslySetBackgroundColor) {
        style.backgroundColor = dangerouslySetBackgroundColor;
      }

      if (pressed && backgroundColor) {
        style.backgroundColor = palette.pseudoStyles[backgroundColor].pressed.backgroundColor;
      }

      if (disabled && backgroundColor) {
        style.backgroundColor = palette.pseudoStyles[backgroundColor].disabled.backgroundColor;
      }

      if (loading && backgroundColor) {
        style.backgroundColor = palette.pseudoStyles[backgroundColor].disabled.backgroundColor;
      }

      if (color) {
        style.color = palette.rgbaStrings[color];
      }

      if (dangerouslySetColor) {
        style.color = dangerouslySetColor;
      }

      if (borderStartColor) {
        /** @todo figure out web version of RN's borderStartColor  */
        style.borderLeftColor = palette.rgbaStrings[borderStartColor];
      }

      if (dangerouslySetBorderStartColor) {
        /** @todo figure out web version of RN's borderStartColor  */
        style.borderLeftColor = dangerouslySetBorderStartColor;
      }

      if (borderEndColor) {
        /** @todo figure out web version of RN's borderEndColor  */
        style.borderRightColor = palette.rgbaStrings[borderEndColor];
      }

      if (dangerouslySetBorderEndColor) {
        /** @todo figure out web version of RN's borderEndColor  */
        style.borderRightColor = dangerouslySetBorderEndColor;
      }

      if (borderTopColor) {
        style.borderTopColor = palette.rgbaStrings[borderTopColor];
      }

      if (dangerouslySetBorderTopColor) {
        style.borderTopColor = dangerouslySetBorderTopColor;
      }

      if (borderBottomColor) {
        style.borderBottomColor = palette.rgbaStrings[borderBottomColor];
      }

      if (dangerouslySetBorderBottomColor) {
        style.borderBottomColor = dangerouslySetBorderBottomColor;
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

      if (opacity) {
        style.opacity = opacity;
      }

      if (textAlign) {
        style.textAlign = textAlign;
      }

      if (fontFamily) {
        style.fontFamily = config.typography[fontFamily].fontFamily;
      }

      if (fontWeight) {
        style.fontWeight = config.typography[fontWeight].fontWeight;
      }

      if (lineHeight) {
        style.lineHeight = config.typography[lineHeight].lineHeight;
      }

      if (fontSize) {
        style.fontSize = config.typography[fontSize].fontSize;
      }

      if (height) {
        style.height = height;
      }

      if (width) {
        style.width = width;
      }

      if (maxHeight) {
        style.maxHeight = maxHeight;
      }

      if (maxWidth) {
        style.maxWidth = maxWidth;
      }

      if (minHeight) {
        style.minHeight = minHeight;
      }

      if (minWidth) {
        style.minWidth = minWidth;
      }

      /** This is a Web HTML element */
      if (typeof Component === 'string') {
        return createElement(Component, {
          style,
          ...nativeProps,
        });
      }

      const accessibilityProps = getA11yProps({
        disabled,
        loading,
      });

      // @ts-expect-error This is fine
      return <Component style={style} {...accessibilityProps} {...nativeProps} />;
    }

    return memo(EnhancedComponent);
  }

  return {
    config,
    compose,
    palette,
    types: {
      tokens: {
        backgroundColor: undefined as unknown as PaletteToken,
        borderColor: undefined as unknown as PaletteToken,
        borderRadius: undefined as unknown as BorderRadiusToken,
        borderWidth: undefined as unknown as BorderWidthToken,
        color: undefined as unknown as PaletteToken,
        spacing: undefined as unknown as SpacingToken,
        typography: undefined as unknown as TypographyToken,
      },
      props: {
        all: {} as ThemeableProps,
        backgroundColorProps: {} as BackgroundColorProps,
        borderColorProps: {} as BorderColorProps,
        borderRadiusProps: {} as BorderRadiusProps,
        borderWidthProps: {} as BorderWidthProps,
        colorProps: {} as ColorProps,
        displayProps: {} as DisplayProps,
        flexProps: {} as FlexProps,
        psuedoStateProps: {} as PsuedoStateProps,
        spacingProps: {} as SpacingProps,
        typographyProps: {} as TypographyProps,
      },
    },
  };
}
