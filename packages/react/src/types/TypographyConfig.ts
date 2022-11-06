export type TextConfig = {
  fontFamily: string;
  fontWeight?: number;
  lineHeight?: number;
  fontSize: number;
};

export type TypographyConfig = {
  variants: {
    [alias: string]: TextConfig;
  };
};
