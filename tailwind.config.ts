import type { Config } from "tailwindcss";

const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        'wedding-primary': '#4a7a52',    // fresh medium green
        'wedding-secondary': '#c8e0b4',  // light sage
        'wedding-accent': '#c8961e',     // warm amber / lantern gold
        'wedding-text': '#1c3d1c',       // dark forest green
        'wedding-gold': '#e0b84a',       // soft candlelight gold
      },
      fontFamily: {
        sans: ['var(--font-primary)', ...fontFamily.sans],
        serif: ['var(--font-secondary)', ...fontFamily.serif],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'wedding-pattern': "url('/images/pattern/garden-pattern.svg')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'float-1': 'float 8s ease-in-out infinite',
        'float-2': 'float 10s ease-in-out infinite',
        'float-3': 'float 12s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
        'move-bg': 'moveBackground 80s linear infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'petal-float-1': 'petalFloat1 7s ease-in-out infinite',
        'petal-float-2': 'petalFloat2 9s ease-in-out infinite',
        'petal-float-3': 'petalFloat3 11s ease-in-out infinite',
        'petal-float-4': 'petalFloat4 6s ease-in-out infinite',
        'glow': 'glowAnim 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'firefly': 'fireflyDrift 8s ease-in-out infinite',
        'btn-glow': 'btnGlow 2.5s ease-in-out infinite',
        'btn-shimmer': 'btnShimmer 2.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        moveBackground: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '400px 400px' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        petalFloat1: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) translateX(6px) rotate(12deg)' },
        },
        petalFloat2: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) translateX(-8px) rotate(-10deg)' },
        },
        petalFloat3: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-22px) rotate(15deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-8deg)' },
        },
        petalFloat4: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-14px) translateX(10px)' },
        },
        glowAnim: {
          '0%, 100%': { boxShadow: 'inset 0 0 20px rgba(200, 150, 30, 0.08)' },
          '50%': { boxShadow: 'inset 0 0 45px rgba(200, 150, 30, 0.18)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
        fireflyDrift: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.6' },
          '25%': { transform: 'translate(8px, -12px)', opacity: '1' },
          '50%': { transform: 'translate(-5px, -20px)', opacity: '0.7' },
          '75%': { transform: 'translate(-10px, -8px)', opacity: '0.9' },
        },
        btnGlow: {
          '0%, 100%': { boxShadow: '0 6px 24px rgba(200,150,30,0.45), 0 2px 8px rgba(0,0,0,0.12)' },
          '50%': { boxShadow: '0 8px 42px rgba(200,150,30,0.72), 0 2px 8px rgba(0,0,0,0.12)' },
        },
        btnShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '60%, 100%': { transform: 'translateX(250%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
