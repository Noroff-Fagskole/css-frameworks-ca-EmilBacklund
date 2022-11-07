const { resolve } = require('path');

export default {
  root: resolve(__dirname, 'src'),
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
  },
  
  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
};
