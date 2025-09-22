/*
 * @Author: chenmeifeng
 * @Date: 2024-12-02 15:57:01
 * @LastEditors: chenmeifeng
 * @LastEditTime: 2024-12-05 10:34:16
 * @Description:
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import {
  configDefine,
  configEnv,
  configRenderBuild,
  configResolve,
} from "./vite-options";
// https://vite.dev/config/
export default defineConfig({
  build: configRenderBuild,
  plugins: [react()],
  resolve: configResolve,
  define: configDefine,
  server: {
    port: Number(configEnv.VITE_DEV_PORT),
    open: true,
    proxy: {
      "/ness": {
        target: `${configEnv.VITE_API_HOST}:${configEnv.VITE_API_PORT}`,
        changeOrigin: true,
        cookieDomainRewrite: "",
        secure: false,
      },
    },
  },
});
