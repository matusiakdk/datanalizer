/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#DC4A29',
          50: '#FDF3F0',
          100: '#FCE7E1',
          200: '#F8CFC3',
          300: '#F4B7A5',
          400: '#F09F87',
          500: '#EC8769',
          600: '#E85C3A',
          700: '#DC4A29',
          800: '#B13C21',
          900: '#862E19',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'progress': 'progress 2s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(220, 74, 41, 0.3)',
        'glow-lg': '0 0 30px rgba(220, 74, 41, 0.4)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(220, 74, 41, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}