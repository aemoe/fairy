module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended", "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react", "jsx-a11y", "import"
  ],
  "rules": {
    "linebreak-style": [
      "error", "unix"
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": ["error", "always"],
    "react/jsx-uses-vars": ["error"],
    "no-console": "off"
  }
};
