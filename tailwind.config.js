/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'Ipaddress': "url('/images/pattern-bg-desktop.png')",
      },
    },
  },
  plugins: [],
}

