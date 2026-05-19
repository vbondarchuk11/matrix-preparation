import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.ts",
      css: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "json-summary", "lcov", "html"],
        reportsDirectory: "./coverage",
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "src/**/*.test.{ts,tsx}",
          "src/test/**",
          "src/tests/**",
          "src/main.tsx",
          "src/vite-env.d.ts",
        ],
        thresholds: {
          lines: 20,
          functions: 55,
          branches: 60,
          statements: 20,
        },
      },
    },
  }),
);
