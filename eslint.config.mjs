import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "domain", pattern: "./src/domain/*" },
        { type: "application", pattern: "./src/application/*" },
        { type: "infrastructure", pattern: "./src/infrastructure/*" },
        { type: "ui", pattern: "./src/ui/*" },
        { type: "features", pattern: "./src/features/*" },
        { type: "app", pattern: "./app/*" },
      ],
    },
    rules: {
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            { from: "domain", allow: "domain" },
            { from: "application", allow: ["application", "domain"] },
            {
              from: "infrastructure",
              allow: ["infrastructure", "domain", "application"],
            },
            {
              from: "ui",
              allow: ["ui", "features"],
            },
            {
              from: "features",
              allow: ["features", "app"],
            },
            {
              from: "app",
              allow: ["app", "features", "ui"],
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
