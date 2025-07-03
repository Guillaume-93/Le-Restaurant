/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      colors: {
        'link-primary': 'var(--link-color-primary)',
        'link-secondary': 'var(--link-color-secondary)',
        'link-tertiary': 'var(--link-color-tertiary)',
        'link-hover': 'var(--link-color-hover)',
        'link-visited': 'var(--link-color-visited)',
        'bg-primary': 'var(--background-color-primary)',
        'bg-secondary': 'var(--background-color-secondary)',
        'bg-tertiary': 'var(--background-color-tertiary)',
        'bg-accent': 'var(--background-color-accent)',
        'bg-highlight': 'var(--background-color-highlight)',
        'text-primary': 'var(--text-color-primary)',
        'text-secondary': 'var(--text-color-secondary)',
        'text-tertiary': 'var(--text-color-tertiary)',
        'text-muted': 'var(--text-color-muted)',
        'text-highlight': 'var(--text-color-highlight)',
        'text-quaternary': 'var(--text-color-quaternary)',
      },
      boxShadow: {
        'default': '2px 3px 3px rgba(0, 0, 0, 0.3)',
        '3xl': '2px 3px 3px 3px rgba(0, 0, 0, 0.4)',
        '4xl': '2px 5px 3px 3px rgba(0, 0, 0, 0.4)',
        '5xl': '8px 8px 3px 3px rgba(0, 0, 0, 0.4)',
        '3bisxl': '3px 3px 3px 3px rgba(255, 255, 255, 0.4)',
        '4bisxl': '5px 5px 3px 3px rgba(255, 255, 255, 0.4)',
        '5bisxl': '8px 8px 3px 3px rgba(255, 255, 255, 0.4)',
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.3)',
        'md': '3px 3px 6px rgba(0, 0, 0, 0.4)',
        'lg': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        'xl': '5px 5px 10px rgba(0, 0, 0, 0.5)',
        '2xl': '6px 6px 12px rgba(0, 0, 0, 0.6)',
        'white': '2px 2px 4px rgba(255, 255, 255, 0.3)',
        'white-lg': '4px 4px 8px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          textShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-2xl': {
          textShadow: '6px 6px 12px rgba(0, 0, 0, 0.6)',
        },
        '.text-shadow-white': {
          textShadow: '2px 2px 4px rgba(255, 255, 255, 0.3)',
        },
        '.text-shadow-white-lg': {
          textShadow: '4px 4px 8px rgba(255, 255, 255, 0.5)',
        },
      });
    },
  ],
}
