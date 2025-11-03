import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#0a0b1e",
          800: "#1a1b3e",
          700: "#2a2b5e",
          600: "#3a3b7e",
          500: "#4a4b9e",
        },
        accent: {
          purple: "#8b5cf6",
          blue: "#3b82f6",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-purple": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-blue": "linear-gradient(135deg, #667eea 0%, #3b82f6 100%)",
      },
      gridTemplateRows: {
        "0": "0fr",
        "1": "1fr",
      },
    },
  },
  plugins: [],
};
export default config;
