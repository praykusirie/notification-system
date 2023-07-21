/** @type {import('tailwindcss').Config} */
export default {
  content: ["src.css", "src/**/*{.html,css,js,svelte,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto": "Roboto, sans-serif",
        "ubuntu": "Ubuntu, sans-serif",
        "cursive": "Abril Fatface, cursive"
      }
    },
  },
  plugins: [],
}

