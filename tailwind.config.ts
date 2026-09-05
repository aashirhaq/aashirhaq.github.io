import type { Config } from "tailwindcss"

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ground: ink black through to raised panel surfaces.
        ink: {
          DEFAULT: "#08090A",
          raised: "#0D0F11",
          panel: "#111316",
          high: "#171A1E",
        },
        // Text: warm ivory down to faint annotation grey.
        ivory: {
          DEFAULT: "#EDEDEA",
          muted: "#9A9EA3",
          faint: "#80858D",
        },
        // The single accent. Cool structure, warm motion.
        signal: {
          DEFAULT: "#E9B872",
          bright: "#F5CE97",
          dim: "#A6813F",
        },
        // Diagram strokes and structural chrome.
        wire: {
          DEFAULT: "#2A2F36",
          bright: "#3D444D",
          dim: "#1B1F24",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Display scale, tuned for tight editorial headings.
        "display-xl": ["clamp(2.75rem, 7vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 3.75rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3.2vw, 2.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.35rem, 2.2vw, 1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        shell: "78rem",
        prose: "44rem",
      },
      spacing: {
        section: "clamp(5rem, 11vw, 9rem)",
      },
      borderRadius: {
        panel: "0.625rem",
      },
      transitionTimingFunction: {
        // Single easing curve across the whole site.
        system: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "packet-drift": {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-node": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "packet-drift": "packet-drift 1.6s linear infinite",
        "pulse-node": "pulse-node 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
