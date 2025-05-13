module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // <-- this must include your components folder
    "./app/**/*.{js,ts,jsx,tsx}" // if using Next.js App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
