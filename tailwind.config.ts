import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      colors: {
        green: '#4ADE80',
        'green-dim': '#22c55e',
        'green-glow': 'rgba(74,222,128,0.18)',
        bg: '#0a0e0b',
        bg2: '#0f1410',
        bg3: '#131a14',
        card: '#111811',
        border: 'rgba(74,222,128,0.12)',
        text: '#e8f0e9',
        muted: '#7a9080',
      },
      fontFamily: {
        heading: ['var(--font-unbounded)', 'sans-serif'],
        body: ['var(--font-onest)', 'sans-serif'],
      },
    },
  },
};

export default config;
