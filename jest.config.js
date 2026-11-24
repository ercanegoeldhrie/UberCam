module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  // Les bibliothèques de navigation sont publiées en code moderne : Jest doit les transformer.
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context)/)',
  ],
};
