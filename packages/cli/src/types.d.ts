declare namespace NodeJS {
  export interface ProcessEnv {
    INIT_CWD: string;
  }
}

declare module 'webfont' {
  type GlyphData = {
    contents: string;
    srcPath: string;
    metadata: {
      path: string;
      name: string;
      unicode: string[];
      renamed: boolean;
      width: number;
      height: number;
      color: string;
    };
  };

  type Params = {
    /**
     * Calculate the bounds of a glyph and center it horizontally.
     * @default false
     */
    centerHorizontally?: boolean;
    /** A file glob, or array of file globs. Ultimately passed to fast-glob to figure out what files you want to get. */
    files: string | string[];
    /** The outputted font height [MAX(icons.height)] */
    fontHeight?: number;
    /** The font family name you want. */
    fontName: string;
    /** The file formats to generate */
    formats: string[];
    /** Normalize icons by scaling them to the height of the highest icon.
     * @default false
     */
    normalize?: boolean;
    /** The start unicode of the generated font */
    startUnicode?: number;
    prependUnicode?: boolean;
  };

  export function webfont(params: Params): Promise<{
    ttf: string;
    woff2: string;
    glyphsData: GlyphData[];
  }>;
}
