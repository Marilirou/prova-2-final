import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Backend
  {
    files: ["*.js", "routes/**/*.js", "controllers/**/*.js", "services/**/*.js", "models/**/*.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs"
    },
    plugins: { js },
    rules: {
      "no-unused-vars": "warn"
    }
  },

  // Frontend
  {
    files: ["frontend/**/*.js"],
    languageOptions: {
      globals: globals.browser,
      sourceType: "module"
    },
    plugins: { js },
    rules: {}
  }
]);
