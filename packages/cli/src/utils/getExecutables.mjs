import path from 'path';
import url from 'url';
import { $, cd, within } from 'zx';
import { spinner } from 'zx/experimental';

/**
 *
 * @param {string[]} executables
 * @returns {Promise<import('zx').ProcessOutput[]>}
 */
export async function getExecutables(executables) {
  return within(async () => {
    const cliDir = path.dirname(url.fileURLToPath(import.meta.url));
    cd(cliDir);

    const dirs = await spinner('Getting executables', function _getExecutables() {
      const promises = executables.map(executable => $`yarn bin ${executable}`);
      return Promise.all(promises);
    });

    return dirs;
  });
}
