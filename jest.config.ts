/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html

*/
import type { Config } from '@jest/types';

export const BaseConfig: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/(index|main).ts',
    '!**/*.(builder|dto|entity|enum|exception|import|interface|mock|module).ts',
    '!**/*.(model|schema).ts',
    '!**/__mocks__.ts',
  ],
  coverageDirectory: '../coverage/unit',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'html-spa'],
  coverageThreshold: {
    global: { branches: 85, functions: 85, lines: 85, statements: 85 },
  },
  maxWorkers: '50%',
  reporters: ['default', 'summary', 'github-actions'],
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: { '^.+\\.(t)s$': 'ts-jest' },
  verbose: false,
};

export default BaseConfig;
