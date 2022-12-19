import { env } from 'wordle-server';

module.exports = {
  expo: {
    name: 'Wordle',
    slug: 'wordle',
    owner: 'mombo-mobile',
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
      bundleIdentifier: 'com.mombo.wordle',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.mombo.wordle',
    },
    extra: {
      env,
      eas: {
        projectId: 'd44d4c7b-45b1-4358-b314-5733974cd5e8',
      },
    },
  },
};
