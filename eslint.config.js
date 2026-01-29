{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "prettier"
  ],
  "rules": {
    "no-unused-vars": "error",
    "no-undef": "warn",
    "eqeqeq": "warn",
    "no-var": "error"
  },
  "ignorePatterns": [
    "node_modules/",
    "dist/",
    "build/"
  ]
}