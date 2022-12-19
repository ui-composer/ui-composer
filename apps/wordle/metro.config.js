// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withMetroConfig } = require('@ui-composer/react/metro-config');

const finalConfig = withMetroConfig(getDefaultConfig(__dirname));

module.exports = finalConfig;
