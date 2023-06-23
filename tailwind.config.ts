import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "synthwave"],
    darkTheme: "synthwave",
  },
  plugins: [require("daisyui")],
} satisfies Config;
