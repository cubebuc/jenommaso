/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                playfair: ['Playfair Display', 'serif'],
                avenir: ['Avenir Light', 'serif'],
            }
        },
    },
    plugins: [],
}

