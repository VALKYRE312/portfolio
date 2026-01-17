export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
      colors: {
        bg: "#0a0a0a",
        fg: "#ffffff",
        muted: "#a1a1a1",
      },
    },
  },
  plugins: [],

  // tailwind.config.js
extend: {
  keyframes: {
    float: {
      '0%,100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(8px)' },
    },
  },
  animation: {
    float: 'float 2s ease-in-out infinite',
  },
},
};
