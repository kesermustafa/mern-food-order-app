/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ffbe33",
                secondary: "#222831",
            },
            fontFamily: {
                dancing: ["Dancing Script", 'cursive'],
                roboto: ['Roboto', 'sans-serif'],
                exo: ['Exo', 'sans-serif'],
                montserrat: ['Monsieur La Doulaise', 'sans-serif'],
            },
        },
    },
    plugins: [],
}