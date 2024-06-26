module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './node_modules/flowbite/**/*.js'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
