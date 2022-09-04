import { resolve } from 'path';

const path = require('path');

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        homepage: path.resolve(__dirname, 'homepage.html'),
        profilepage: path.resolve(__dirname, 'profilepage.html'),
      },
    },
    outDir: '/dist',
  },
  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
};
