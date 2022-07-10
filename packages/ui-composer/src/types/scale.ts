/* SCALE/SPACING */
export type Scale = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge' | 'xxxLarge';
type SpacingDirection = 'top' | 'bottom' | 'left' | 'right' | 'all' | 'horizontal' | 'vertical';
type SpacingStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type SpacingParams = {
  [key in SpacingDirection]?: SpacingStep;
};
