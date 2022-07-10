/* CSS STYLE OVERRIDES */
declare module 'csstype' {
  type CssVariable = import('./helpers').CssVariable;
  type PaletteAlias = import('./helpers').PaletteAlias;

  type CssVariables = { [key in CssVariable<PaletteAlias>]?: string };
  interface Properties extends CssVariables {}
}
