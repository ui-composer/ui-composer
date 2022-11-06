export type SpacingConfig<SpacingToken extends number> = {
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
