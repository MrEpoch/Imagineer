import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkmode: {
          100: "#f9f9f9",
          200: "#f5f5f5",
          300: "#f2f2f2",
          400: "#e6e6e6",
          500: "#d9d9d9",
          600: "#5d5d5d",
          700: "#3d3d3d",
          800: "#212121",
          900: "#181818",
        },
      },
    },
  },
  plugins: [],
};
export default config;
