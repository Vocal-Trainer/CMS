module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["!**/*", "**/*.stories.*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unsafe-optional-chaining": "off",
    "no-case-declarations": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
