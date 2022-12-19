type EnvVars = import('../env').ProcessEnvVars;

declare module 'process' {
  declare global {
    namespace NodeJS {
      interface ProcessEnv extends EnvVars {}
    }
  }
}
