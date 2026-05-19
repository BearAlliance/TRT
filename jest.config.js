/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
}
