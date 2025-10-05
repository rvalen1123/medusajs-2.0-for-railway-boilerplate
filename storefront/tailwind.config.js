const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        // Ultra-Modern Color System (Soma Inspired)
        brand: {
          primary: "#00363d",        // Deep teal
          "primary-hover": "#002329", // Darker teal
          "primary-light": "#004d56", // Lighter teal
          secondary: "#c6dcdf",       // Sage green
          "secondary-dark": "#a5c4c8", // Darker sage
          "secondary-light": "#e0eef0", // Lighter sage
          accent: "#ecb157",          // Warm gold
          "accent-hover": "#d99c3f",  // Darker gold
          "accent-light": "#f5c778",  // Lighter gold
        },
        modern: {
          teal: {
            50: "#e0eef0",
            100: "#c6dcdf",
            200: "#a5c4c8",
            300: "#7fa9af",
            400: "#5a8e96",
            500: "#00363d",
            600: "#004d56",
            700: "#002329",
            800: "#001a1f",
            900: "#001115",
          },
          sage: {
            50: "#f0f8f9",
            100: "#e0eef0",
            200: "#c6dcdf",
            300: "#a5c4c8",
            400: "#85abb1",
            500: "#669299",
            600: "#4d7980",
            700: "#336067",
            800: "#1a474e",
            900: "#002e35",
          },
          gold: {
            50: "#fef9f0",
            100: "#fdf3e0",
            200: "#f5c778",
            300: "#ecb157",
            400: "#d99c3f",
            500: "#c68727",
            600: "#a56d1f",
            700: "#845317",
            800: "#63390f",
            900: "#422007",
          },
        },
        // Enhanced grey scale - modern neutrals
        grey: {
          0: "#FFFFFF",
          5: "#FAFAFA",
          10: "#F6F6F6",
          15: "#F0F0F0",
          20: "#E0E0E0",
          30: "#CCCCCC",
          40: "#B3B3B3",
          50: "#999999",
          60: "#666666",
          70: "#4D4D4D",
          80: "#333333",
          90: "#1A1A1A",
          95: "#0D0D0D",
          100: "#000000",
        },
        // Semantic colors - modern muted
        success: {
          DEFAULT: "#10B981",
          light: "#D1FAE5",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
          dark: "#D97706",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
          dark: "#DC2626",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#DBEAFE",
          dark: "#2563EB",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        DEFAULT: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
        "modern": "0 10px 40px rgba(0, 54, 61, 0.12)",
        "modern-lg": "0 20px 60px rgba(0, 54, 61, 0.15)",
        "modern-xl": "0 25px 80px rgba(0, 54, 61, 0.2)",
        "glow": "0 0 20px rgba(236, 177, 87, 0.3)",
        "glow-lg": "0 0 40px rgba(236, 177, 87, 0.4)",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "DM Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
        display: [
          "DM Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "scale-out": {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right": "fade-in-right 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in-left": "fade-in-left 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in-down": "fade-in-down 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top": "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "scale-out": "scale-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "accordion-open": "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close": "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down": "slide-down 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        leave: "leave 150ms ease-in forwards",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-radix")()],
}
