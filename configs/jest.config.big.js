/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    'src/index.ts',
    'src/_setupTests.ts',
    'src/ui/fontawesome/js/*'
  ],
  setupFiles: [
    '<rootDir>/config/polyfills.ts',
    '<rootDir>/src/_setupTests.ts'
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.ts?(x)',
    '<rootDir>/src/**/?(*.)(spec|test).ts?(x)'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(css|sass)$': '<rootDir>/config/jest/cssTransform.ts',
    '^.+\\.(md|graphql|png)$': '<rootDir>/config/jest/fileTransform.ts'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'
  ],
  moduleFileExtensions: [
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
    'mjs',
    'ts',
    'tsx'
  ],
  globalSetup: './config/jest/global-wrapper.ts',
  globals: {
    'ts-jest': {
      packageJson: 'package.json'
    }
  }
}
