import { env } from 'wordle-server';

module.exports = {
  expo: {
    name: 'Wordle Remix',
    slug: 'wordle-remix',
    owner: 'remix-labs',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.remix-labs.wordle',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.remix-labs.wordle',
    },
    extra: {
      env,
      eas: {
        projectId: 'd44d4c7b-45b1-4358-b314-5733974cd5e8',
      },
    },
  },
};
