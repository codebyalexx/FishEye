module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    semi: [1, "always"],
    quotes: [2, "double", { avoidEscape: true }]
  }
};
