const path = require('path');

export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/login.html'),
        homepage: path.resolve(__dirname, 'src/index.html'),
        profilepage: path.resolve(__dirname, 'src/profilepage.html'),
        userPost: path.resolve(__dirname, 'src/userPost.html'),
        editPost: path.resolve(__dirname, 'src/editPost.html'),
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
