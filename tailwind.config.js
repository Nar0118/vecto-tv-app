/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1631ff',
          hover: '#0b26f8',
        },
        background: {
          dark: '#000000',
          light: '#0f0f0f',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.86)',
          muted: 'rgba(255, 255, 255, 0.64)',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
        },
        shadow: {
          light: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.5)',
        }
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        'large': '16px',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}
