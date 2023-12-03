import { withTV } from 'tailwind-variants/transformer';
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
export const darkMode = ['class'];
export const content = [
  './index.html',
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  './src/**/*.{ts,tsx}',
];
export const theme = withTV({
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
      sm: '576',
    },
  },
  extend: {
    fontFamily: {
      poppins: "'Poppins', sans-serif",
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      darkish: 'hsl(217, 16%, 16%)',
      danger: 'rgb(255, 86, 48)',
      'light-blue-50': 'rgb(0, 55, 104)',
      'light-50': 'rgb(145, 158, 171)',
      'sky-blue-50': 'rgb(97, 243, 243)',
      green: 'rgb(0, 167, 111)',
      red: 'rgb(255, 48, 48)',
      ring: 'hsl(var(--ring))',
      active: 'rgba(255, 48, 48, 0.08)',
      'red-active': 'rgb(255, 193, 172)',
      yellow: 'rgb(255, 171, 0)',
      background: 'hsl(var(--background))',
      back: 'hsl(var(--back))',
      for: 'rgba(var(--for))',
      modal: 'rgb(var(--modal))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    keyframes: {
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'spin-slow': 'spin 3s linear infinite',
      'spinner-ease-spin': 'spin 1.5s ease infinite',
    },
  },
});
export const plugins = [require('tailwindcss-animate'), nextui()];
