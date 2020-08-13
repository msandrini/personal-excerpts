/**
 * "ts-jest" package must be installed
 * a file "jestFileTransform.ts" must be there as well
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(md|png|svg|css|sass)$': '<rootDir>jestFileTransform.ts'
  },
}

// CONTENTS of "jestFileTransform.ts"

  //eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require('path')

  module.exports = {
    process(src, filename) {
      return `module.exports = ${JSON.stringify(path.basename(filename))};`
    }
  }