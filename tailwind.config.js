/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
	],
  darkMode: 'class',
  important: true,
	theme: {
		 screens: {
						xs: "540px",
						sm: '640px',
						md: '768px',
						lg: '1024px',
						xl: '1280px',
						'2xl': '1536px',
				},

		container: {
				center: true,
				padding: {
						DEFAULT: '12px',
						sm: '1rem',
						lg: '45px',
						xl: '5rem',
						'2xl': '13rem',
				},

		},
		extend: {
      colors: {
                'primary': '#f78e2f',
                'primary-dark': '#e77e1f',
            },
      zIndex: {
                1: '1',
                2: '2',
                3: '3',
                999: '999',
            },
		},
	},
	plugins: [
		 require('@tailwindcss/typography'),
		 require('@tailwindcss/forms'),
	],
}
