const { resolve } = require('path');
import { defineConfig } from "vite";

export default defineConfig ({
  root: resolve(__dirname, 'src'),
  publicDir: resolve("public"),
  preview: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/login.html'),
        homePage: resolve(__dirname, 'src/index.html'),
        profilePage: resolve(__dirname, 'src/profilePage.html'),
        userPost: resolve(__dirname, 'src/userPost.html'),
        editPost: resolve(__dirname, 'src/editPost.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir : true
  },
  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
});
