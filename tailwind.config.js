/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#E30A17', // Turkish Flag Red
                secondary: '#8a040b', // Darker Red
                accent: '#F2C511', // Gold (Traditional accent)
                dark: '#1e293b',
            },
            fontFamily: {
                heading: ['Barlow', 'sans-serif'], // Modern, strong
                body: ['Merriweather', 'serif'], // Literary, classic
            }
        },
        container: {
            center: true,
            padding: '1rem',
        },
    },
    plugins: [],
}
