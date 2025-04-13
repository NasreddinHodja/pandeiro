// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt(
  {
    name: "prettier-rules",
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
  {
    name: "disable-formatting-rules",
    rules: {
      ...eslintConfigPrettier.rules,
    },
  }
);
