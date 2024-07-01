import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.config.*", "**/components", "**/node_modules"],
  },
  ...fixupConfigRules(
    compat.extends("@react-native", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended")
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
  eslintConfigPrettier,
];
