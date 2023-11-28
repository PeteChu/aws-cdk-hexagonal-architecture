module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test', '<rootDir>/application'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
