/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        dark:       "#020817",
        surface:    "#0a1628",
        surface2:   "#0f1f3d",
        surface3:   "#162033",
        // Brand
        primary:    "#3b82f6",
        primaryHover: "#60a5fa",
        accent:     "#10b981",
        gold:       "#f59e0b",
        fifagold:   "#f59e0b",
        purple:     "#8b5cf6",
        danger:     "#ef4444",
        // Text
        muted:      "#64748b",
        subtle:     "#94a3b8",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #020817 0%, #0a1628 50%, #0f1f3d 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        'blue-gradient': 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        'green-gradient': 'linear-gradient(135deg, #10b981, #059669)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1)',
        'glow-gold': '0 0 20px rgba(245,158,11,0.3), 0 0 60px rgba(245,158,11,0.1)',
        'glow-green': '0 0 20px rgba(16,185,129,0.3), 0 0 60px rgba(16,185,129,0.1)',
        'glow-purple': '0 0 20px rgba(139,92,246,0.3), 0 0 60px rgba(139,92,246,0.1)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'scan': 'scan 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(59,130,246,0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(59,130,246,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scan: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '64px',
      },
    },
  },
  plugins: [],
}
