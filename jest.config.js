const scope = process.argv[2] || ''

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
    'mand-mobile(.*)': '<rootDir>/$1',
    'mand-mobile/lib(.*)': '<rootDir>/components$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  collectCoverage: !scope,
  collectCoverageFrom: [
    'components/*/*.{js,vue}'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ]
}