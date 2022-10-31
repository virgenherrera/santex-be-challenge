import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Environment } from '../../src/common/enums';

const mockTestEnv = {
  NODE_ENV: Environment.test,
  FOOTBALL_DATA_API_KEY: 'fake-api-key',
};

export const mockConfigService: Record<keyof ConfigService, any> = {
  get: jest.fn().mockImplementation(key => mockTestEnv[key]),
  getOrThrow: jest.fn(),
};

export const mockHttpService: Record<keyof HttpService, any> = {
  request: jest.fn(),
  get: jest.fn(),
  delete: jest.fn(),
  head: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  axiosRef: jest.fn(),
};
