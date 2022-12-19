export type ProcessEnvVars = {
  WORDLE_AUTH_SECRET: string;
  WORDLE_SERVER_HOSTNAME: string;
  WORDLE_SERVER_PORT: number;
};

export const env = {
  secretKey: process.env.WORDLE_AUTH_SECRET,
  serverHostname: process.env.WORDLE_SERVER_HOSTNAME,
  serverPort: process.env.WORDLE_SERVER_PORT,
  get serverUrl() {
    return `${this.serverHostname}:${this.serverPort}`;
  },
};

export type EnvVars = typeof env;
