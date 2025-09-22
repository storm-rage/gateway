/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 15:57:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2025-05-07 15:38:12
 * @Description:
 */
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    // extends: [js.configs.recommended, ...tseslint.configs.recommended],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:prettier/recommended",
    ],
    // files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-this-alias": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      // 关闭 React PropTypes 校验
      "react/prop-types": "off",
      semi: ["error", "never"],
      "no-extra-semi": "error",
    },
  }
);
