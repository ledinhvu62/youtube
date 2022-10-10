/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'blackSecondary': '#121417',
                'textColor': '#606060',
                'borderColor': '#0000001a'
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp')
    ],
}
