module.exports = {
  content: ['./*.{html,js}', './js/*.js', './js/helpers/*.js'],

  theme: {
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        julius: ['Julius Sans One', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0px 0px 13px 1px rgb(0 0 0 / 30%)',
      },
      screens: {
        xsm: '570px',
      },
    },
  },
  plugins: [],
};
