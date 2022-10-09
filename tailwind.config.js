module.exports = {
  content: ['./*.{html,js}', '.js/*.js'],

  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        julius: ['Julius Sans One', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      screens: {
        xsm: '570px',
      },
    },
  },
  plugins: [],
};
