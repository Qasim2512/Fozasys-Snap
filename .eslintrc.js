/** @format */

module.exports = {
  extends: ["airbnb"],
  plugins: ["import"],
  rules: {
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/export": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": "error",
    // Add this rule to help remove unused imports
    "import/export": "error",
    "no-useless-escape": "off",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
};
