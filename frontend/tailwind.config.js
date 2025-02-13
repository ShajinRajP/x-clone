import daisyui from 'daisyui';
import daisyUIThemes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "rgb(29, 155, 240)",
          secondary: "rgb(179, 173, 173)",
          info: "rgb(219, 216, 216)",
          warning: "rgb(235, 250, 253)"
        },
      },
    ],
  },
}


