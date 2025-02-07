import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./design/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1140px',
        '2xl': '1140px',
      },
      colors: {
        'activeLink': '#151421',
        'whiteBG': '#FFFFFF',
        'cloudGray':'#8b94a5'
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
