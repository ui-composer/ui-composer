export type TypographyConfigurableValues = {
  fontFamily: string;
  fontWeight: number;
  lineHeight: number;
  fontSize: number;
};

export type TypographyConfig = {
  [alias: string]: TypographyConfigurableValues;
};

export type TypographyPropsGeneric<TextVariant> = {
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontFamily?: TextVariant;
  fontWeight?: TextVariant;
  lineHeight?: TextVariant;
  fontSize?: TextVariant;
};
