module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "func-style": ["error", "declaration"],
    "multiline-comment-style": ["error", "starred-block"],
  },
}
