require('dotenv').config({ path: '.env.test' });

module.exports = {
  displayName: 'e2e',
  testMatch: ['**/tests/e2e/**/*.test.js'],
  testEnvironment: 'node',
  maxWorkers: 1
};
