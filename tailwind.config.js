module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        GitHub: "#333",
        LinkedIn: "#0077b5",
        Discord: "#5865f2",
        React: "#61dafb",
        Untappd: "#F5C342",
        work: "#33B3D1",
        TypeScript: "#3178c6",
        csharp: "#9b4993",
        cbs: "#4967AA",
        svelte: "#EB4E27"
      },
      borderRadius: {
        'social': '20%'
      }
    },
  },
  darkMode: "class",
  plugins: [],
}
