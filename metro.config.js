const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// On désactive le support expérimental des shims Node
// qui cause l'erreur "node:sea" sur Windows
config.resolver.unstable_enableNodeExtensions = false;

module.exports = config;