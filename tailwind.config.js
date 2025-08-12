export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'black': '#000000', // Pure black
        'white': '#ffffff', // Pure white
        'gray-dark': '#2d2d2d', // Dark gray
        'gray-light': '#f5f5f5', // Light gray
        'black-500': '#333333', // A lighter shade of black
        'white-500': '#dcdcdc', // A lighter shade of white
      },
    },
  },
  plugins: [],
};