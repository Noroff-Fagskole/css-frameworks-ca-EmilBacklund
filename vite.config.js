const path = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        homepage: path.resolve(__dirname, 'homepage.html'),
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
