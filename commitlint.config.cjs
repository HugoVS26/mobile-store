module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'header-min-length': [2, 'always', 10],
    'header-max-length': [2, 'always', 72],
  },
};
