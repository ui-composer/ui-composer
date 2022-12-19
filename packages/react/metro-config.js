const path = require('node:path');
const metroResolver = require('metro-resolver');
const uiComposerPath = path.dirname(require.resolve('@ui-composer/react'));
const nativeRedirects = ['native', 'ios', 'android'];

let paths;

/*
 * Use tsconfig to resolve additional workspace libs.
 *
 * This resolve function requires projectRoot to be set to
 * workspace root in order modules and assets to be registered and watched.
 */
function getResolveRequest(_context, realModuleName, platform) {
  // TODO: change to pull from config?
  const extensions = ['', 'ts', 'tsx', 'js', 'jsx', 'json'];
  const debug = process.env.NX_REACT_NATIVE_DEBUG === 'true';

  if (debug) console.log(`[Nx] Resolving: ${realModuleName}`);

  const { resolveRequest, ...context } = _context;

  const resolvedPath =
    defaultMetroResolver(context, realModuleName, platform, debug) ||
    tsconfigPathsResolver(context, extensions, realModuleName, platform, debug);
  if (resolvedPath) {
    return resolvedPath;
  }
  throw new Error(`Cannot resolve ${realModuleName}`);
}

/**
 * This function try to resolve path using metro's default resolver
 * @returns path if resolved, else undefined
 */
function defaultMetroResolver(context, realModuleName, platform, debug) {
  try {
    return metroResolver.resolve(context, realModuleName, platform);
  } catch {
    if (debug) console.log(`[Nx] Unable to resolve with default Metro resolver: ${realModuleName}`);
  }
}

function getMatcher(debug) {
  if (!matcher) {
    const result = loadConfig();
    if (result.resultType === 'success') {
      absoluteBaseUrl = result.absoluteBaseUrl;
      paths = result.paths;
      if (debug) {
        console.log(`[Nx] Located tsconfig at ${chalk.bold(absoluteBaseUrl)}`);
        console.log(
          `[Nx] Found the following paths:\n:${chalk.bold(JSON.stringify(paths, null, 2))}`
        );
      }
      matcher = createMatchPath(absoluteBaseUrl, paths);
    } else {
      console.log(`[Nx] Failed to locate tsconfig}`);
      throw new Error(`Could not load tsconfig for project`);
    }
  }
  return matcher;
}

/**
 * This function try to resolve files that are specified in tsconfig's paths
 * @returns path if resolved, else undefined
 */
function tsconfigPathsResolver(context, extensions, realModuleName, platform, debug) {
  const tsConfigPathMatcher = getMatcher(debug);
  const match = tsConfigPathMatcher(
    realModuleName,
    undefined,
    undefined,
    extensions.map(ext => `.${ext}`)
  );

  if (match) {
    return metroResolver.resolve(context, match, platform);
  } else {
    if (debug) {
      console.log(`[Nx] Failed to resolve ${chalk.bold(realModuleName)}`);
      console.log(
        `[Nx] The following tsconfig paths was used:\n:${JSON.stringify(paths, null, 2)}`
      );
    }
  }
}

function withMetroConfig(config) {
  config.resolver.resolveRequest = (context, readlModuleName, platform) => {
    let resolution = getResolveRequest(context, readlModuleName, platform);
    /** Filter ui-composer resolutions */
    if (resolution.type === 'sourceFile' && resolution.filePath.startsWith(uiComposerPath)) {
      const { name, base: fileBaseName, ext: fileExt } = path.parse(resolution.filePath);
      const isAlreadyNativeFile = nativeRedirects.some(nativeExt => name.endsWith(nativeExt));

      /** Native redirect is already present, return the resolved path  */
      if (isAlreadyNativeFile) {
        return resolution;
      }

      nativeRedirects.forEach(nativeExt => {
        const proposedBaseName = `${name}.${nativeExt}${fileExt}`;
        const newProposedFilePath = resolution.filePath.replace(fileBaseName, proposedBaseName);
        if (context.doesFileExist(newProposedFilePath)) {
          resolution.filePath = newProposedFilePath;
        }
      });
    }
    return resolution;
  };

  return config;
}

module.exports = { withMetroConfig };
