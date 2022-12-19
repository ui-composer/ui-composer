import { env } from 'wordle-server';

module.exports = {
  expo: {
    name: 'Wordle Remix',
    slug: 'wordle-remix',
    owner: 'remix-labs',
    scheme: 'wordle-remix',
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
      bundleIdentifier: 'com.remix-labs.wordle-remix',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.remix_labs.wordle_remix',
    },
    extra: {
      env,
      eas: {
        projectId: '45afecc1-c4e7-4743-b15d-e26a298e74c5',
      },
    },
  },
};
