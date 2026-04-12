/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'base': '8px',
      },
      borderRadius: {
        'small': '8px',
        'large': '12px',
      },
      borderWidth: {
        'DEFAULT': '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        'thin': '0.5px',
      },
      colors: {
        primary: "#1a1c19",
        highlight: "#F5F5F0",
        brand: "#8B5E3C",
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
      },
      fontSize: {
        'xs': '11px',
        'sm': '13px',
        'base': '15px',
        'lg': '22px',
        'xl': '28px',
        'display': ['clamp(28px, 5vw, 64px)', { lineHeight: '1.15' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
      },
      lineHeight: {
        tight: '1.15',
        relaxed: '1.6',
        loose: '1.7',
      }
    },
  },
  plugins: [],
}
