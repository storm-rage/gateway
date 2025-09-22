/*
 * @Author: chenmeifeng
 * @Date: 2024-12-03 10:14:31
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-06 16:20:04
 * @Description:
 */
import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { loadEnv, type UserConfig } from "vite";
import VitePluginCompression from "vite-plugin-compression";

export const configEnv = loadEnv(process.env.MODE!, process.cwd(), "");
console.log(configEnv, "configEnv");

export const configDefine: UserConfig["define"] = {
  "process.env": configEnv,
};

export const configPlugins: UserConfig["plugins"] = [
  react(),
  VitePluginCompression({ deleteOriginFile: false }),
];

function resolvePath(dir = "./src") {
  return resolve(__dirname, dir);
}

export const configResolve: UserConfig["resolve"] = {
  alias: {
    "@": resolvePath(),
    "@pages": resolvePath("./src/pages"),
    "@configs": resolvePath("./src/configs"),
    "@hooks": resolvePath("./src/hooks"),
    "@store": resolvePath("./src/store"),
    "@utils": resolvePath("./src/utils"),
  },
};

export const configRenderBuild: UserConfig["build"] = {
  outDir: "dist",
  rollupOptions: {
    output: {
      chunkFileNames: "assets/js/[name]-[hash].js",
      assetFileNames: "assets/[ext]/[name]-[hash][extname]",
    },
  },
  minify: "terser",
  terserOptions: {
    compress: {
      drop_console: configEnv.NODE_ENV !== "development",
      drop_debugger: true,
    },
  },
};

export const configRenderBuildEle: UserConfig["build"] = (function () {
  const configBuild: UserConfig["build"] = {
    ...configRenderBuild,
    rollupOptions: {
      ...configRenderBuild.rollupOptions,
      input: { index: resolve(__dirname, "index.html") },
    },
    reportCompressedSize: false,
    // @ts-ignore
    publicDir: resolve(__dirname, "public"),
  };
  return configBuild;
})();
