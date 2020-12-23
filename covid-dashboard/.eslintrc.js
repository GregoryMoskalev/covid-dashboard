module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [ 'eslint:recommended', 'airbnb-base', 'prettier' ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never'
      },
    ],
  }
};
