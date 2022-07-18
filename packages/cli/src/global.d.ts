declare namespace NodeJS {
  export interface ProcessEnv {
    INIT_CWD: string;
  }
}

declare module 'zx' {
  export * from 'node_modules/zx';
  export declare let argv: Pick<import('minimist').ParsedArgs, '--' | '_'> & {
    cwd?: string;
    dirs?: string;
    watch?: boolean;
  };
}
