module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': ['warn', 'never'],
    'no-undef': 0,
    'react/no-unused-state': 0,
    'react/prop-types': 0,
    'react/static-property-placement': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'no-console': ['error', { allow: ['tron'] }],
    'no-param-reassign': 'off',
  },
};
