// eslint.config.js
// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

// Importa los plugins necesarios
const prettierPlugin = require("eslint-plugin-prettier");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const reactNativePlugin = require("eslint-plugin-react-native");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");

module.exports = defineConfig([
  // 1. Configuración de Expo. Esto ya incluye la mayoría de los plugins.
  expoConfig,

  // 2. Extiende la configuración de Prettier.
  prettierRecommended,

  // 3. Objeto de configuración principal con plugins y reglas.
  {
    ignores: ["dist/*"],
    files: ["**/*.{ts,tsx}"],

    // Define los plugins que no vienen con la configuración base.
    plugins: {
      prettier: prettierPlugin,
      "react-hooks": reactHooksPlugin,
      "react-native": reactNativePlugin,
      "@typescript-eslint": typescriptEslint,
    },

    // Tus reglas personalizadas.
    rules: {
      // Regla para variables no usadas
      "no-unused-vars": "off", // Desactiva la regla base
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Regla para estilos de StyleSheet no usados
      "react-native/no-unused-styles": "error",

      // Resto de tus reglas
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-native/no-inline-styles": "warn",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
]);
