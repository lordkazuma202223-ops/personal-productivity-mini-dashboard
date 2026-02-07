module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Code style changes
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'chore', // Maintenance tasks
        'ci', // CI/CD changes
      ],
    ],
    'subject-case': [0], // Disable subject case check
  },
};
