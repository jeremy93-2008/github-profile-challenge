/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlueGithub: "#111729",
        blueGithub: "#1D1B48",
        lightBlueGithub: "#3662E3",
        darkGrayGithub: "#20293A",
        grayGithub: "#364153",
        lightGrayGithub: "#4A5567",
        whiteGithub: "#CDD5E0",
      },
      fontSize: {
        "xl": "2rem",
        "l": "1.25rem",
        "m": "1rem",
        "s": "0.75rem",
      },
      backgroundImage: {
        'hero': "url('/src/assets/img/hero-image-github-profile.png')",
      }
    },
  },
  plugins: [],
}

