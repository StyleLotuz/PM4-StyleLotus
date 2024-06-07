module.exports = {
    preset: 'ts-jest',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    testRegex: '.*\\.spec\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
  };