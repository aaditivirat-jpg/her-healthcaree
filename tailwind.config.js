/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F5EFEB',
          200: '#EFE7E0',
          300: '#E4D9D0',
          400: '#D5C5B9',
          500: '#C2AEA0',
        },
        rose: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F8D1DB',
          300: '#F2ADC0',
          400: '#E87C9E',
          500: '#D64E7C',
          600: '#BC3464',
          700: '#9E2651',
          800: '#832344',
          900: '#6E213D',
        },
        plum: {
          50: '#FAF5F8',
          100: '#F4EAF1',
          200: '#EBD7E5',
          300: '#DBB7D1',
          400: '#C48EB6',
          500: '#A96898',
          600: '#8E4E7C',
          700: '#733B62',
          800: '#5F3251',
          900: '#4F2D44',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E6ECE7',
          200: '#D0DDD2',
          300: '#ABC3AF',
          400: '#80A486',
          500: '#5E8765',
          600: '#496B4F',
          700: '#3A543F',
        },
        terracotta: {
          50: '#FDF6F2',
          100: '#FBEDE3',
          200: '#F6D8C4',
          300: '#EEBD9E',
          400: '#E39973',
          500: '#D47449',
          600: '#B8552D',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Lora', 'Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
