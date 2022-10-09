const path = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'login.html'),
        homepage: path.resolve(__dirname, 'index.html'),
        profilepage: path.resolve(__dirname, 'profilepage.html'),
      },
    },
  },
  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
};
