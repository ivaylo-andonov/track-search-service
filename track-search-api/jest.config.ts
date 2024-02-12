import { type Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  rootDir: '.',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts': 'ts-jest',
    '^.+\\.graphql$': 'graphql-import-node/jest',
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/prismaMock.ts'],
};

export default config;
