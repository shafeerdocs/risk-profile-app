module.exports = {
    preset: 'jest-expo',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-native/extend-expect'],
  };
  