/* eslint-env node */
/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-imports",
  ],
  tailwindFunctions: ["cva"],
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  quoteProps: "as-needed",
};

export default config;
