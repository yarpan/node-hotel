module.exports = {
  displayName: 'integration',
  testMatch: ['**/tests/integration/**/*.test.js'],
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage/integration',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json'],
  verbose: true
};
