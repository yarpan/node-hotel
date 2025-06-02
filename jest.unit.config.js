module.exports = {
  displayName: 'unit',
  testMatch: ['**/tests/unit/**/*.test.js'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage/unit',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json'],
  verbose: true
};
