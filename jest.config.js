module.exports = {
    preset: 'react-native',
    transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@?react-navigation)'],
    transform: {
      '^.+\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsConfigFile: 'tsconfig.jest.json',
      },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    modulePaths: ['<rootDir>'],
    setupFiles: ['./tests/setup.js'],
  }