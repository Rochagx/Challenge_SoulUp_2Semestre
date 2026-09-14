/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: "#0b3a3e",
        ocean: "#0f5c63",
        teal: {
          DEFAULT: "#19c5b6",
          dark: "#14a99c",
        },
        mint: "#7fe7dc",
        lime: {
          DEFAULT: "#c5d84a",
          dark: "#a8bc2e",
        },
        bg: "#f4faf9",
        surface: "#ffffff",
        muted: "#5e7274",
        borderc: "#dde9e8",
        success: "#19c5b6",
        danger: "#e25b4a",
        error: "#e25b4a",
        warning: "#f0b429",
      },
      fontFamily: {
        display: ["Poppins", "Segoe UI", "sans-serif"],
        body: ["Inter", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        "soft-sm": "0 2px 8px rgba(12, 35, 64, 0.06)",
        "soft-md": "0 8px 24px rgba(12, 35, 64, 0.1)",
        "soft-lg": "0 16px 40px rgba(12, 35, 64, 0.15)",
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        header: "72px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        modalIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease both",
        modalIn: "modalIn 0.25s ease",
      },
    },
  },
  plugins: [],
};
