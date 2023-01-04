/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [ './src/**/*.tsx' ],
    theme: {
        extend: {
            colors: {
                'black': {
                    50: '#73737',
                    100: '#666666',
                    200: '#595959',
                    300: '#4D4D4D',
                    400: '#404040',
                    500: '#333333',
                    600: '#262626',
                    700: '#1A1A1A',
                    800: '#0D0D0D',
                    900: '#000000',
                },
                'white': {
                    50: '#fff',
                    100: '#F2F2F2',
                    200: '#E6E6E6',
                    300: '#D9D9D9',
                    400: '#CCCCCC',
                    500: '#BFBFBF',
                    600: '#B3B3B3',
                    700: '#A6A6A6',
                    800: '#999999',
                    900: '#8C8C8C',
                },
                'red': {
                    500: '#EE5544',
                    600: '#CC4233'
                },
                'yellow': {
                    500: '#EEAA44',
                    600: '#CC8F33'
                },
                'green': {
                    500: '#5BED45',
                    600: '#47CC33'
                },
                'blue': {
                    500: '#456AED',
                    600: '#3355CC'
                }
            },
            transitionProperty: {
                width: 'width',
            },
            boxShadow: {
                'alert-red': '0px 0px 10px -1px #EE5544',
            },
            gridTemplateColumns: {
                'double': '1fr auto'
            },
            keyframes: {
                'right-to-left': {
                    '0%': { transform: 'translateX(100px)', opacity: .8 },
                    '100%': { transform: 'translateX(0)', opacity: 1 },
                }
            },
            animation: {
                'movie-left': 'right-to-left .2s linear forwards',
            }
        }
    }
}