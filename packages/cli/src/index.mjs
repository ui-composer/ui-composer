import { run } from '@oclif/core';

/**
 * Invokes the `testcli-modern` CLI with args programmatically.
 *
 * @param {...string} args - args to pass to CLI.
 *
 * @returns {Promise<unknown>}
 */
export default async function testcli(...args) {
  return run(args, import.meta.url);
}
