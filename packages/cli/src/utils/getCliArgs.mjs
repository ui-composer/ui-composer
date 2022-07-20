/**
 * @template T extends { [key: string]: string | number | boolean }
 * @param {T} flags
 */
export function getCliArgs(flags) {
  let cliArgs = [];
  for (const [key, value] of Object.entries(flags)) {
    cliArgs.push(`--${key}`);
    cliArgs.push(value);
  }
  cliArgs = cliArgs.filter(item => item !== true);
}
