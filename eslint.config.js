import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.recommended,
  { rules: {} },
  prettier,
  ...svelte.configs.prettier,
];
