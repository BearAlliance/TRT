/** @type {import('jest').Config} **/
module.exports = {
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
}
