import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "night"],
    darkTheme: "night",
  },
  plugins: [require("daisyui")],
} satisfies Config;
