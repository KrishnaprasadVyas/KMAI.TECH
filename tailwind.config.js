/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#F3EFE7',
        ink: '#15130F',
        redline: '#FF3B1F',
        hairline: 'rgba(21, 19, 15, 0.15)',
        hairlineDark: 'rgba(21, 19, 15, 0.45)',
        draftingGrid: 'rgba(21, 19, 15, 0.04)',
        muted: '#636059',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        serif: ['Fraunces', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
