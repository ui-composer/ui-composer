const path = require('node:path');
const uiComposerPath = path.dirname(require.resolve('@ui-composer/react'));
const nativeRedirects = ['native', 'ios', 'android'];

function withMetroConfig(config) {
  const originalResolveRequest = config.resolver.resolveRequest;

  config.resolver.resolveRequest = (context, readlModuleName, platform) => {
    let resolution = originalResolveRequest(context, readlModuleName, platform);
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
