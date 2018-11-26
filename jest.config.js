module.exports = {
  setupFiles: ['<rootDir>/test/jest.init.js'],
  testMatch: [
    '**/jest-test/**/*.spec.js'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  globals: {
    'vue-jest': {
      babelConfig: {
        configFile: '<rootDir>/.babelrc'
      }
    }
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'components/*/*.{js,vue}'
  ],
  modulePaths: [
    '<rootDir>/components',
    '<rootDir>/node_modules'
  ],
  moduleNameMapper: {
    'mand-mobile(.*)': '<rootDir>/$1',
    'mand-mobile/lib(.*)': '<rootDir>/components$1'
  },
  coverageReporters: [
    'html',
    'text-summary'
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ]
}