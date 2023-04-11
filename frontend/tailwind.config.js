/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      translate: {
        '-1/2': '-50.00000%',
      },
      colors: {
        btn: '#f0c14b',
        borderbtn: '#dddfe2',
        hoverbutton: '#e0a91d',
        danger: '#be4b49',
        black: '#000',
        gray5: '#555',
        gray7: '#777',
      },
      width: {
        '3/10': '30%',
      },
    },
  },
  plugins: [],
}
