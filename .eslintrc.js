module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "no-console": "warn",
    "import/no-extraneous-dependencies": "warn",
    "no-unused-vars": ["error", { vars: "all" }]
  }
};
