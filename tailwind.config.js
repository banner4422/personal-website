module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
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
        svelte: "#EB4E27",
        Discogs: "#000000",
        Python: "#ffd343",
        Spotify: "#1DB954",
        Bluesky: "#1185FE",
      },
      borderRadius: {
        social: "20%",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
