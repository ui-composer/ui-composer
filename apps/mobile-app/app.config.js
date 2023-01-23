// @ts-check

/** @type {import('@expo/config-types').ExpoConfig} */
const expoConfig = {
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
  ],
  name: 'UI composer',
  slug: 'ui-composer',
  owner: 'remix-labs',
  scheme: 'ui-composer',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  runtimeVersion: {
    policy: 'nativeVersion',
  },
  version: '1.0.0',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.remix-labs.ui-composer',
    buildNumber: '1', // increment when making native changes
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.remix_labs.ui_composer',
    versionCode: 1, // increment when making native changes
  },
  extra: {
    eas: {
      projectId: 'b78bd109-0ea0-4589-9db3-5625795f2e95',
    },
  },
};

module.exports = { expo: expoConfig };
