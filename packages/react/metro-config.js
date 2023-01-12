const path = require('node:path');
// eslint-disable-next-line import/no-extraneous-dependencies
const metroResolver = require('metro-resolver');
// eslint-disable-next-line import/no-extraneous-dependencies
const { createMatchPath, loadConfig } = require('tsconfig-paths');

const uiComposerPath = path.dirname(__dirname);

let paths;
let matcher;
let absoluteBaseUrl;
const nativeRedirects = ['native', 'ios', 'android'];

/**
 * This function try to resolve path using metro's default resolver
 * @returns path if resolved, else undefined
 */
function defaultMetroResolver(context, realModuleName, platform) {
  try {
    return metroResolver.resolve(context, realModuleName, platform);
  } catch {
    throw new Error(`[Nx] Unable to resolve with default Metro resolver: ${realModuleName}`);
  }
}

function getMatcher() {
  if (!matcher) {
    const result = loadConfig();
    if (result.resultType === 'success') {
      absoluteBaseUrl = result.absoluteBaseUrl;
      paths = result.paths;
      matcher = createMatchPath(absoluteBaseUrl, paths);
    } else {
      throw new Error(`Could not load tsconfig for project`);
    }
  }
  return matcher;
}

/**
 * This function try to resolve files that are specified in tsconfig's paths
 * @returns path if resolved, else undefined
 */
function tsconfigPathsResolver(context, extensions, realModuleName, platform) {
  const tsConfigPathMatcher = getMatcher();
  const match = tsConfigPathMatcher(
    realModuleName,
    undefined,
    undefined,
    extensions.map(ext => `.${ext}`)
  );

  if (match) {
    return metroResolver.resolve(context, match, platform);
  }
  return undefined;
}

/*
 * Use tsconfig to resolve additional workspace libs.
 *
 * This resolve function requires projectRoot to be set to
 * workspace root in order modules and assets to be registered and watched.
 */
function getResolveRequest(context, moduleName, platform) {
  // TODO: change to pull from config?
  const extensions = ['', 'ts', 'tsx', 'js', 'jsx', 'json'];

  const resolvedPath =
    defaultMetroResolver(context, moduleName, platform) ||
    tsconfigPathsResolver(context, extensions, moduleName, platform);
  if (resolvedPath) {
    return resolvedPath;
  }
  throw new Error(`Cannot resolve ${moduleName}`);
}

function withMetroConfig(config) {
  config.resolver.resolveRequest = (context, readlModuleName, platform) => {
    let resolution = getResolveRequest(context, readlModuleName, platform);
    // React Native doesn't support exports field in package.json, so we resolve it manually.
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
