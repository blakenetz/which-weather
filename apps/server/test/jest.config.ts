import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from '../../../tsconfig.json';

console.log(compilerOptions.baseUrl);

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '../../../..',
  }),
  roots: ['<rootDir>/..'],
  collectCoverage: true,
};

export default jestConfig;
