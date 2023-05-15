// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: '#000',
        white: '#fff',
        lightText: '#76797d',
        burntOrange: '#bf5700',
        burntOrangeDark: '#a64a00',
        charcoal: '#333f48',
        charcoalLight: '#4a5a65',
        charcoalDark: '#1e262c',
      },
      // Change background color to charcoal
       backgroundColor: theme => ({
         ...theme('colors'),
         'charcoal': '#333f48',
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}