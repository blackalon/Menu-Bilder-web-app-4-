/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'primary-dark': '#2563EB',
        'primary-light': '#60A5FA',
      },
      contrast: {
        '110': '1.1',
      },
      scale: {
        '102': '1.02',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.5' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateX(100%)', opacity: '0.5' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite'
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.15)',
        'glow': '0 0 15px rgba(var(--primary-rgb), 0.5)',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
};
