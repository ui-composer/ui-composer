const { withNxMetro } = require('@nrwl/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { withMetroConfig } = require('@ui-composer/react/metro-config');

const expoMetroConfig = getDefaultConfig(__dirname, { mode: 'exotic' });

module.exports = (async () => {
  expoMetroConfig.transformer.babelTransformerPath = require.resolve(
    'react-native-svg-transformer'
  );
  expoMetroConfig.resolver.assetExts = expoMetroConfig.resolver.assetExts.filter(
    ext => ext !== 'svg'
  );
  expoMetroConfig.resolver.sourceExts.push('svg');
  expoMetroConfig.resolver.resolverMainFields.unshift('react-native');

  const nxMetroConfig = withNxMetro(expoMetroConfig, {
    // Change this to true to see debugging info.
    // Useful if you have issues resolving modules
    debug: false,
    // the project root to start the metro server
    projectRoot: __dirname,
  });

  return withMetroConfig(nxMetroConfig);
})();
