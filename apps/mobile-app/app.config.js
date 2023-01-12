module.exports = {
  expo: {
    name: 'UI composer',
    slug: 'mobile-app',
    owner: 'kmartinezmedia',
    scheme: 'mobile-app',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: 'https://u.expo.dev/0e906e78-ac10-45e3-af65-c0d7004456ea',
    },
    assetBundlePatterns: ['**/*'],
    runtimeVersion: {
      policy: 'nativeVersion',
    },
    version: '1.0.0',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.kmartinezmedia.mobile-app',
      buildNumber: '1', // increment when making native changes
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.kmartinezmedia.mobile_app',
      versionCode: 0, // increment when making native changes
    },
    extra: {
      eas: {
        projectId: '0e906e78-ac10-45e3-af65-c0d7004456ea',
      },
    },
  },
};
