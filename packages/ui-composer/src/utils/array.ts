export const emptyArray = [];

export function join(...args: Array<string | undefined>) {
  return args.filter(Boolean).join(' ');
}
