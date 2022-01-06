const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#323337',
          1000: '#3f3f3f',
          1050: '#151618'
        }
      },
      animation: {
        scroll: 'scroll 10s linear infinite',
        spinner: 'spinner 0.7s linear infinite'
      },
      keyframes: {
        scroll: { 
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-250px * 7))' }
        },
        spinner: {
          'to': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  variants: {
    extend: {
      translate: ['active', 'group-hover'],
      borderWidth: ['hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled']
    },
  },
  plugins: [
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      const colorMap = Object.keys(colors)
        .map(color => ({
          [`.border-t-${color}`]: {borderTopColor: colors[color]},
          [`.border-r-${color}`]: {borderRightColor: colors[color]},
          [`.border-b-${color}`]: {borderBottomColor: colors[color]},
          [`.border-l-${color}`]: {borderLeftColor: colors[color]},
        }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    }
  ],
}
