const TEST_TYPE = process.env.TEST_TYPE || 'components'
// const TEST_BUNDLE = TEST_TYPE === 'bundle' ? 'lib/mand-mobile.umd' : ''

module.exports = {
  setupFiles: ['<rootDir>/test/jest.init.js'],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
    '.*\\.vue$': 'vue-jest',
    '^.+\\.svg$': 'jest-svg-sprite-loader'
  },
  globals: {
    'vue-jest': {
      babelConfig: {
        configFile: '<rootDir>/.babelrc'
      }
    }
  },
  modulePaths: [
    '<rootDir>/components',
    '<rootDir>/node_modules'
  ],
  moduleNameMapper: {
    '@examples(.*)': '<rootDir>/examples/$1',
    'mand-mobile/lib(.*)': `<rootDir>/${TEST_TYPE}$1`,
    'mand-mobile/components(.*)': `<rootDir>/${TEST_TYPE}$1`
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/*/*.{js,vue}'
  ],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage'
}